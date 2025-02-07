import React, { useState } from 'react'
import { SUPPORTED_CHAINS } from '@/config/blockchain'
import { FaExchangeAlt } from 'react-icons/fa'

const MultiChainSwap = () => {
  const [fromChain, setFromChain] = useState(SUPPORTED_CHAINS[0])
  const [toChain, setToChain] = useState(SUPPORTED_CHAINS[1])
  const [fromToken, setFromToken] = useState('')
  const [toToken, setToToken] = useState('')
  const [amount, setAmount] = useState('')

  const handleSwap = () => {
    // Implement cross-chain swap logic
    console.log('Performing cross-chain swap', {
      fromChain, toChain, fromToken, toToken, amount
    })
  }

  return (
    <div className="bg-dark-100 p-6 rounded-lg">
      <h2 className="text-2xl font-bold text-white mb-4">Multi-Chain Token Swap</h2>
      
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label className="text-white">From Chain</label>
          <select 
            value={fromChain.id}
            onChange={(e) => {
              const chain = SUPPORTED_CHAINS.find(c => c.id === Number(e.target.value))
              setFromChain(chain)
            }}
            className="w-full p-2 bg-dark-200 text-white"
          >
            {SUPPORTED_CHAINS.map(chain => (
              <option key={chain.id} value={chain.id}>
                {chain.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-white">To Chain</label>
          <select 
            value={toChain.id}
            onChange={(e) => {
              const chain = SUPPORTED_CHAINS.find(c => c.id === Number(e.target.value))
              setToChain(chain)
            }}
            className="w-full p-2 bg-dark-200 text-white"
          >
            {SUPPORTED_CHAINS.map(chain => (
              <option key={chain.id} value={chain.id}>
                {chain.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <input 
          type="text"
          placeholder="From Token Address"
          value={fromToken}
          onChange={(e) => setFromToken(e.target.value)}
          className="w-full p-2 bg-dark-200 text-white"
        />
        <input 
          type="text"
          placeholder="To Token Address"
          value={toToken}
          onChange={(e) => setToToken(e.target.value)}
          className="w-full p-2 bg-dark-200 text-white"
        />
      </div>

      <input 
        type="number"
        placeholder="Amount to Swap"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="w-full p-2 mb-4 bg-dark-200 text-white"
      />

      <button 
        onClick={handleSwap}
        className="w-full bg-primary text-white p-2 rounded hover:bg-blue-700 flex items-center justify-center"
      >
        <FaExchangeAlt className="mr-2" /> Perform Cross-Chain Swap
      </button>
    </div>
  )
}

export default MultiChainSwap
