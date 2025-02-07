# Quantum Trade Platform Deployment Guide

## Prerequisites
- Ubuntu VPS (Hostinger)
- Domain: www.999leads.com
- IP: 153.92.208.206

## Step-by-Step Deployment

### 1. Server Preparation
```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js (LTS version)
curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install MongoDB
wget -qO - https://www.mongodb.org/static/pgp/server-6.0.asc | sudo apt-key add -
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/6.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-6.0.list
sudo apt-get update
sudo apt-get install -y mongodb-org

# Start MongoDB
sudo systemctl start mongod
sudo systemctl enable mongod

# Install PM2
sudo npm install -g pm2
```

### 2. Clone Repository
```bash
cd /var/www
sudo git clone https://github.com/yourusername/quantum-trade-platform.git
cd quantum-trade-platform

# Install dependencies
npm install
npm run build
```

### 3. Nginx Configuration
```bash
sudo apt-get install -y nginx

# Create Nginx configuration
sudo nano /etc/nginx/sites-available/quantum-trade

# Add the following configuration
server {
    listen 80;
    server_name www.999leads.com 153.92.208.206;
    
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}

# Enable site
sudo ln -s /etc/nginx/sites-available/quantum-trade /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

### 4. SSL Configuration
```bash
sudo apt-get install -y certbot python3-certbot-nginx
sudo certbot --nginx -d www.999leads.com
```

### 5. Start Application
```bash
# Set environment variables
export NODE_ENV=production
export MONGODB_URI=mongodb://localhost:27017/quantum_trade
export JWT_SECRET=your_very_secure_secret_key

# Start with PM2
pm2 start ecosystem.config.js
pm2 save
pm2 startup
```

### 6. Firewall Configuration
```bash
sudo ufw allow 'Nginx Full'
sudo ufw allow ssh
sudo ufw enable
```

## Post-Deployment Steps
1. Configure admin settings through admin panel
2. Set up API keys for AI integrations
3. Configure platform fees and supported networks

## Maintenance
```bash
# Update application
cd /var/www/quantum-trade-platform
git pull
npm install
npm run build
pm2 restart quantum-trade-platform
```

## Troubleshooting
- Check logs: `pm2 logs`
- Restart application: `pm2 restart quantum-trade-platform`
- Check MongoDB: `sudo systemctl status mongod`
