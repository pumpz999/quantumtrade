import React, { useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'

const AITradingAssistant = () => {
  const [query, setQuery] = useState('')
  const [analysis, setAnalysis] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const generateTradingInsights = async () => {
    if (!query.trim()) {
      toast.error('Please enter a query')
      return
    }

    setIsLoading(true)
    try {
      // Mock AI trading insights (replace with actual AI service)
      const mockInsights = [
        "Current market sentiment appears bullish for Ethereum.",
        "Consider dollar-cost averaging for long-term positions.",
        "Watch for support and resistance levels around $2,300.",
        "Potential short-term volatility expected in the next 48 hours."
      ]

      // Simulating API call delay
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      setAnalysis(mockInsights.join('\n'))
      toast.success('Trading insights generated!')
    } catch (error) {
      toast.error('Failed to generate insights')
      console.error('AI Trading Analysis Error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="bg-dark-100 p-6 rounded-lg">
      <h2 className="text-2xl font-bold text-white mb-4">AI Trading Assistant</h2>
      <textarea 
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Ask about trading strategies, market trends..."
        className="w-full p-3 bg-dark-200 text-white rounded mb-4"
        rows={4}
        disabled={isLoading}
      />
      <button 
        onClick={generateTradingInsights}
        className={`w-full p-2 rounded transition-colors duration-300 ${
          isLoading 
            ? 'bg-gray-500 cursor-not-allowed' 
            : 'bg-primary text-white hover:bg-blue-700'
        }`}
        disabled={isLoading}
      >
        {isLoading ? 'Generating Insights...' : 'Generate AI Insights'}
      </button>

      {analysis && (
        <div className="mt-6 bg-dark-200 p-4 rounded text-white">
          <h3 className="text-lg font-semibold mb-2">AI Market Analysis</h3>
          <p className="whitespace-pre-line">{analysis}</p>
        </div>
      )}
    </div>
  )
}

export default AITradingAssistant
