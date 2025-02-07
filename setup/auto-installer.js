#!/usr/bin/env node
import fs from 'fs'
import path from 'path'
import { execSync } from 'child_process'
import readline from 'readline'
import crypto from 'crypto'

class AutoInstaller {
  constructor() {
    this.configPath = path.resolve(process.cwd(), 'quantum-config.json')
    this.envPath = path.resolve(process.cwd(), '.env')
    this.setupLog = path.resolve(process.cwd(), 'setup-log.txt')
  }

  generateSecureSecret(length = 32) {
    return crypto.randomBytes(length).toString('base64')
  }

  async promptUser(questions) {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    })

    const answers = {}
    for (const question of questions) {
      answers[question.key] = await new Promise((resolve) => {
        rl.question(`${question.prompt}: `, (answer) => {
          resolve(answer)
        })
      })
    }

    rl.close()
    return answers
  }

  async autoDetectEnvironment() {
    const environment = {
      os: process.platform,
      nodeVersion: process.version,
      architecture: process.arch
    }

    try {
      environment.mongoVersion = execSync('mongod --version').toString().split('\n')[0]
      environment.npmVersion = execSync('npm --version').toString().trim()
    } catch (error) {
      console.error('Some dependencies might not be installed')
    }

    return environment
  }

  async generateConfiguration() {
    const questions = [
      { key: 'domain', prompt: 'Enter Domain (e.g., 999leads.com)' },
      { key: 'serverIp', prompt: 'Enter Server IP' },
      { key: 'mongoUri', prompt: 'MongoDB Connection URI (default: mongodb://localhost:27017/quantum_trade)' },
      { key: 'openaiKey', prompt: 'OpenAI API Key' },
      { key: 'anthropicKey', prompt: 'Anthropic API Key (optional)' },
      { key: 'adminEmail', prompt: 'Admin Email' },
      { key: 'adminPassword', prompt: 'Admin Password' }
    ]

    const answers = await this.promptUser(questions)
    
    // Generate additional secure secrets
    answers.jwtSecret = this.generateSecureSecret()
    answers.mongoSecret = this.generateSecureSecret()

    // Set default values if not provided
    answers.mongoUri = answers.mongoUri || 'mongodb://localhost:27017/quantum_trade'

    // Validate critical inputs
    if (!answers.domain || !answers.serverIp) {
      throw new Error('Domain and Server IP are required')
    }

    return answers
  }

  async writeEnvironmentFile(config) {
    const envContent = `
# Server Configuration
NODE_ENV=production
PORT=3000
DOMAIN=${config.domain}
SERVER_IP=${config.serverIp}

# MongoDB Configuration
MONGODB_URI=${config.mongoUri}
MONGODB_SECRET=${config.mongoSecret}

# JWT Configuration
JWT_SECRET=${config.jwtSecret}

# Platform Settings
PLATFORM_FEE=0.1
DEFAULT_NETWORKS=ethereum,polygon,binance

# AI Integration
OPENAI_API_KEY=${config.openaiKey}
ANTHROPIC_API_KEY=${config.anthropicKey || ''}

# Admin Credentials
ADMIN_EMAIL=${config.adminEmail}
ADMIN_PASSWORD=${config.adminPassword}

# Security
IP_WHITELIST=${config.serverIp}
`
    fs.writeFileSync(this.envPath, envContent)
  }

  async setupMongoDB(config) {
    try {
      const { MongoClient } = await import('mongodb')
      const client = new MongoClient(config.mongoUri)
      
      await client.connect()
      const db = client.db()

      // Create admin user
      const usersCollection = db.collection('users')
      const hashedPassword = await this.hashPassword(config.adminPassword)

      await usersCollection.insertOne({
        username: 'quantum_admin',
        email: config.adminEmail,
        password: hashedPassword,
        role: 'admin',
        createdAt: new Date()
      })

      await client.close()
    } catch (error) {
      console.error('MongoDB setup failed:', error)
      throw error
    }
  }

  async hashPassword(password) {
    const { hash } = await import('bcryptjs')
    return hash(password, 10)
  }

  async runInitialSetup() {
    try {
      console.log('🚀 Quantum Trade Platform - Automated Installer')
      
      // Detect environment
      const environment = await this.autoDetectEnvironment()
      console.log('Detected Environment:', environment)

      // Generate configuration
      const config = await this.generateConfiguration()

      // Write environment file
      await this.writeEnvironmentFile(config)

      // Setup MongoDB
      await this.setupMongoDB(config)

      // Log successful setup
      fs.writeFileSync(this.setupLog, JSON.stringify({
        timestamp: new Date().toISOString(),
        status: 'SUCCESS',
        config: { ...config, adminPassword: '********' }
      }))

      console.log('✅ Installation Complete!')
      console.log('Next steps: npm run start')
    } catch (error) {
      console.error('❌ Installation Failed:', error)
      fs.writeFileSync(this.setupLog, JSON.stringify({
        timestamp: new Date().toISOString(),
        status: 'FAILED',
        error: error.message
      }))
    }
  }
}

// Run the installer
const installer = new AutoInstaller()
installer.runInitialSetup()
