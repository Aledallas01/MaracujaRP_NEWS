import React, { useState } from 'react'
import { AuthProvider } from './contexts/AuthContext'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import PublicNewsView from './components/PublicNewsView'
import NewsManagement from './components/admin/NewsManagement'
import SectionsManagement from './components/admin/SectionsManagement'
import UsersManagement from './components/admin/UsersManagement'
import { useAuth } from './contexts/AuthContext'

const AppContent: React.FC = () => {
  const [currentView, setCurrentView] = useState('home')
  const [searchQuery, setSearchQuery] = useState('')
  const { isAuthenticated } = useAuth()

  const renderContent = () => {
    if (!isAuthenticated) {
      return <PublicNewsView searchQuery={searchQuery} />
    }

    switch (currentView) {
      case 'news':
        return <NewsManagement />
      case 'sections':
        return <SectionsManagement />
      case 'users':
        return <UsersManagement />
      default:
        return <PublicNewsView searchQuery={searchQuery} />
    }
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar currentView={currentView} onViewChange={setCurrentView} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header searchQuery={searchQuery} onSearchChange={setSearchQuery} />
        
        <main className="flex-1 overflow-y-auto">
          {renderContent()}
        </main>
      </div>
    </div>
  )
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  )
}

export default App