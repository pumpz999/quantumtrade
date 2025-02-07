import { createConfig, http } from 'wagmi'
import { mainnet, polygon, hardhat } from 'wagmi/chains'
import { 
  injected, 
  walletConnect, 
  coinbaseWallet 
} from 'wagmi/connectors'

export const config = createConfig({
  chains: [mainnet, polygon, hardhat],
  connectors: [
    injected(),
    walletConnect({ 
      projectId: import.meta.env.VITE_WALLETCONNECT_PROJECT_ID || '' 
    }),
    coinbaseWallet({
      appName: 'Meme Token Trading Platform'
    })
  ],
  transports: {
    [mainnet.id]: http(),
    [polygon.id]: http(),
    [hardhat.id]: http()
  }
})
