import React, { useState } from 'react'
import { Search, Book, ShoppingCart, Settings } from 'lucide-react'
import LoginModal from './LoginModal'

interface HeaderProps {
  searchQuery: string
  onSearchChange: (query: string) => void
}

const Header: React.FC<HeaderProps> = ({ searchQuery, onSearchChange }) => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)

  return (
    <>
      <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <h1 className="text-2xl font-bold text-gray-900">News Manager</h1>
          </div>
          
          <div className="flex items-center space-x-6">
            {/* Search Bar */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Cerca articoli..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-64"
              />
            </div>
            
            {/* Navigation Icons */}
            <div className="flex items-center space-x-4">
              <a
                href="https://maracuja-rp.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                title="Vai al libro"
              >
                <Book className="h-6 w-6" />
              </a>
              
              <a
                href="https://maracuja-rp.vercel.app/?store"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                title="Vai al store"
              >
                <ShoppingCart className="h-6 w-6" />
              </a>
              
              <button
                onClick={() => setIsLoginModalOpen(true)}
                className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                title="Impostazioni"
              >
                <Settings className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <LoginModal 
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
      />
    </>
  )
}

export default Header