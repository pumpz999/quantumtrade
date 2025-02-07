import { useState } from 'react'
import { useTradeStore } from '@/stores/tradeStore'

export function TradingInterface() {
  const [tokenAddress, setTokenAddress] = useState('')
  const [amount, setAmount] = useState('')
  const [price, setPrice] = useState('')

  const { addTrade, platformFee } = useTradeStore()

  const handleTrade = () => {
    const trade = {
      tokenAddress,
      amount: parseFloat(amount),
      price: parseFloat(price),
      fee: platformFee
    }
    addTrade(trade)
    // Additional trade logic would go here
  }

  return (
    <div className="bg-dark-100 p-6 rounded-lg">
      <h2 className="text-white text-xl mb-4">Meme Token Trading</h2>
      <input 
        type="text" 
        placeholder="Token Address" 
        value={tokenAddress}
        onChange={(e) => setTokenAddress(e.target.value)}
        className="w-full mb-2 p-2 bg-dark-200 text-white"
      />
      <input 
        type="number" 
        placeholder="Amount" 
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="w-full mb-2 p-2 bg-dark-200 text-white"
      />
      <input 
        type="number" 
        placeholder="Price" 
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        className="w-full mb-2 p-2 bg-dark-200 text-white"
      />
      <button 
        onClick={handleTrade}
        className="w-full bg-primary text-white p-2 rounded"
      >
        Execute Trade
      </button>
    </div>
  )
}
