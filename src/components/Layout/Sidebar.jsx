import React from 'react'
import { 
  FaHome, 
  FaChartLine, 
  FaExchangeAlt, 
  FaRobot, 
  FaCog 
} from 'react-icons/fa'
import { Link } from 'react-router-dom'

const Sidebar = () => {
  const menuItems = [
    { 
      icon: <FaHome />, 
      label: 'Dashboard', 
      path: '/dashboard' 
    },
    { 
      icon: <FaChartLine />, 
      label: 'Trading', 
      path: '/trading' 
    },
    { 
      icon: <FaExchangeAlt />, 
      label: 'Swap', 
      path: '/swap' 
    },
    { 
      icon: <FaRobot />, 
      label: 'AI Assistant', 
      path: '/ai-trading' 
    },
    { 
      icon: <FaCog />, 
      label: 'Settings', 
      path: '/settings' 
    }
  ]

  return (
    <div className="bg-dark-100 w-64 h-screen fixed left-0 top-0 p-4">
      <div className="text-white text-2xl font-bold mb-8 text-center">
        Quantum Trade
      </div>

      <nav>
        {menuItems.map((item, index) => (
          <Link 
            key={index} 
            to={item.path} 
            className="flex items-center text-white p-3 hover:bg-dark-200 rounded transition duration-300"
          >
            <span className="mr-3">{item.icon}</span>
            {item.label}
          </Link>
        ))}
      </nav>
    </div>
  )
}

export default Sidebar
