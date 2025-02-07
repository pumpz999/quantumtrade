import React, { useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'

const PlatformSettingsForm = () => {
  const [settings, setSettings] = useState({
    platformFee: 0.1,
    supportedNetworks: [
      { name: 'Ethereum', chainId: 1, enabled: true },
      { name: 'Polygon', chainId: 137, enabled: true },
      { name: 'Binance Smart Chain', chainId: 56, enabled: false }
    ],
    aiIntegrations: [
      { 
        provider: 'OpenAI', 
        enabled: true, 
        requiredFields: ['apiKey', 'organizationId'] 
      },
      { 
        provider: 'Anthropic', 
        enabled: false, 
        requiredFields: ['apiKey'] 
      }
    ]
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post('/api/admin/settings', settings)
      toast.success('Platform settings updated successfully!')
    } catch (error) {
      toast.error('Failed to update settings')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-dark-100 p-6 rounded-lg">
      <h2 className="text-2xl font-bold text-white mb-4">Platform Settings</h2>
      
      <div className="mb-4">
        <label className="text-white">Platform Fee (%)</label>
        <input 
          type="number" 
          value={settings.platformFee}
          onChange={(e) => setSettings({
            ...settings, 
            platformFee: parseFloat(e.target.value)
          })}
          className="w-full p-2 bg-dark-200 text-white"
          min="0"
          max="5"
          step="0.1"
        />
      </div>

      <div className="mb-4">
        <h3 className="text-white mb-2">Supported Networks</h3>
        {settings.supportedNetworks.map((network, index) => (
          <div key={network.chainId} className="flex items-center mb-2">
            <input 
              type="checkbox"
              checked={network.enabled}
              onChange={() => {
                const updatedNetworks = [...settings.supportedNetworks]
                updatedNetworks[index].enabled = !network.enabled
                setSettings({ ...settings, supportedNetworks: updatedNetworks })
              }}
              className="mr-2"
            />
            <span className="text-white">{network.name}</span>
          </div>
        ))}
      </div>

      <div className="mb-4">
        <h3 className="text-white mb-2">AI Integrations</h3>
        {settings.aiIntegrations.map((integration, index) => (
          <div key={integration.provider} className="mb-2">
            <div className="flex items-center">
              <input 
                type="checkbox"
                checked={integration.enabled}
                onChange={() => {
                  const updatedIntegrations = [...settings.aiIntegrations]
                  updatedIntegrations[index].enabled = !integration.enabled
                  setSettings({ ...settings, aiIntegrations: updatedIntegrations })
                }}
                className="mr-2"
              />
              <span className="text-white">{integration.provider}</span>
            </div>
          </div>
        ))}
      </div>

      <button 
        type="submit" 
        className="w-full bg-primary text-white p-2 rounded hover:bg-blue-700"
      >
        Save Platform Settings
      </button>
    </form>
  )
}

export default PlatformSettingsForm
