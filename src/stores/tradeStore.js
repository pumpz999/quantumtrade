import { create } from 'zustand'

export const useTradeStore = create((set) => ({
  trades: [],
  platformFee: 1,
  
  addTrade: (trade) => set((state) => ({
    trades: [...state.trades, trade]
  })),

  updatePlatformFee: (fee) => set({ platformFee: fee }),

  resetTrades: () => set({ trades: [] })
}))
