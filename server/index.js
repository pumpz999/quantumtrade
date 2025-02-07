import express from 'express'
import mongoose from 'mongoose'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import User from './models/User.js'
import PlatformSettings from './models/PlatformSettings.js'
import Trade from './models/Trade.js'

const app = express()
app.use(express.json())

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/quantum_trade', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

// Admin Settings Management
app.post('/api/admin/settings', async (req, res) => {
  try {
    const { platformFee, supportedNetworks, aiIntegrations } = req.body
    
    const settings = await PlatformSettings.findOneAndUpdate(
      {}, 
      { platformFee, supportedNetworks, aiIntegrations },
      { upsert: true, new: true }
    )
    
    res.json(settings)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// User API Key Management
app.post('/api/user/apikeys', async (req, res) => {
  try {
    const { platform, key, secret } = req.body
    const user = await User.findByIdAndUpdate(
      req.user.id, 
      { $push: { apiKeys: { platform, key, secret } } },
      { new: true }
    )
    res.json(user.apiKeys)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Trade Execution
app.post('/api/trade', async (req, res) => {
  try {
    const { token, type, amount, price } = req.body
    const platformSettings = await PlatformSettings.findOne()
    
    const fee = amount * (platformSettings.platformFee / 100)
    
    const trade = new Trade({
      user: req.user.id,
      token,
      type,
      amount,
      price,
      fee
    })
    
    await trade.save()
    res.json(trade)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
