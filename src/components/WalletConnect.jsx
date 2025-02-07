import { ConnectButton } from '@rainbow-me/rainbowkit'

export function WalletConnect() {
  return (
    <ConnectButton 
      label="Connect Wallet"
      chainStatus="icon"
      showBalance={false}
    />
  )
}
