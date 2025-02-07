import mongoose from 'mongoose'

const PlatformSettingsSchema = new mongoose.Schema({
  platformFee: { 
    type: Number, 
    default: 0.1, // 0.1% default fee
    min: 0,
    max: 5 
  },
  supportedNetworks: [{
    name: String,
    chainId: Number,
    enabled: Boolean
  }],
  aiIntegrations: [{
    provider: String,
    enabled: Boolean,
    requiredFields: [String]
  }],
  securitySettings: {
    twoFactorEnabled: { type: Boolean, default: false },
    ipWhitelist: [String]
  }
}, { timestamps: true })

export default mongoose.model('PlatformSettings', PlatformSettingsSchema)
