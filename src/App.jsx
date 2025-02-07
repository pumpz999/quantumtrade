import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { WagmiProvider } from 'wagmi'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { RainbowKitProvider } from '@rainbow-me/rainbowkit'
import { Toaster } from 'react-hot-toast'

import { config } from './config/wagmi'
import Sidebar from './components/Layout/Sidebar'
import HomePage from './pages/HomePage'

const queryClient = new QueryClient()

function App() {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          <BrowserRouter>
            <div className="flex">
              <Sidebar />
              <main className="ml-64 flex-grow">
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  {/* Add more routes as needed */}
                </Routes>
              </main>
            </div>
            <Toaster position="top-right" />
          </BrowserRouter>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  )
}

export default App
