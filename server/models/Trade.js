import mongoose from 'mongoose'

const TradeSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  token: {
    address: String,
    symbol: String,
    network: String
  },
  type: { 
    type: String, 
    enum: ['buy', 'sell', 'swap'] 
  },
  amount: Number,
  price: Number,
  fee: Number,
  status: {
    type: String,
    enum: ['pending', 'completed', 'failed'],
    default: 'pending'
  }
}, { timestamps: true })

export default mongoose.model('Trade', TradeSchema)
