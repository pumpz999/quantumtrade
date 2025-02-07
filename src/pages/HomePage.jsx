import React from 'react'
import MultiChainSwap from '@/components/Trading/MultiChainSwap'
import AITradingAssistant from '@/components/AITrading/AITradingAssistant'
import { FaWallet, FaChartBar, FaBitcoin } from 'react-icons/fa'

const HomePage = () => {
  return (
    <div className="bg-dark-300 min-h-screen text-white p-8">
      <div className="grid grid-cols-3 gap-6">
        {/* Quick Stats */}
        <div className="bg-dark-100 p-6 rounded-lg flex items-center">
          <FaWallet className="text-4xl mr-4 text-primary" />
          <div>
            <h3 className="text-xl">Total Balance</h3>
            <p className="text-2xl font-bold">$45,678.92</p>
          </div>
        </div>

        <div className="bg-dark-100 p-6 rounded-lg flex items-center">
          <FaChartBar className="text-4xl mr-4 text-green-500" />
          <div>
            <h3 className="text-xl">Portfolio Growth</h3>
            <p className="text-2xl font-bold text-green-500">+12.4%</p>
          </div>
        </div>

        <div className="bg-dark-100 p-6 rounded-lg flex items-center">
          <FaBitcoin className="text-4xl mr-4 text-yellow-500" />
          <div>
            <h3 className="text-xl">Active Trades</h3>
            <p className="text-2xl font-bold">7 Trades</p>
          </div>
        </div>

        {/* Multi-Chain Swap */}
        <div className="col-span-2">
          <MultiChainSwap />
        </div>

        {/* AI Trading Assistant */}
        <div>
          <AITradingAssistant />
        </div>
      </div>
    </div>
  )
}

export default HomePage
