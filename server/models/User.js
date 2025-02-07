import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  apiKeys: [{
    platform: String,
    key: String,
    secret: String
  }],
  tradingPreferences: {
    aiTrainingData: [String],
    riskTolerance: { type: Number, default: 5 },
    preferredNetworks: [String]
  }
}, { timestamps: true })

export default mongoose.model('User', UserSchema)
