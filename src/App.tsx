import React, { useState } from "react";
import { AuthProvider } from "./contexts/AuthContext";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";
import PublicNewsView from "./components/PublicNewsView";
import PublicRulesView from "./components/PublicRulesView";
import PublicStoreView from "./components/PublicStoreView";
import { useAuth } from "./contexts/AuthContext";

const AppContent: React.FC = () => {
  const [currentView, setCurrentView] = useState("home");
  const [searchQuery, setSearchQuery] = useState("");
  const { isAuthenticated } = useAuth();

  const renderContent = () => {
    if (!isAuthenticated) {
      // Quando NON autenticato, mostra la vista pubblica con ricerca abilitata
      return (
        <PublicNewsView
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery} // necessario per aggiornare la ricerca
        />
      );
    }

    // Vista per utenti autenticati in base a currentView
    switch (currentView) {
      case "home":
        return <PublicNewsView />;
      case "rules":
        return <PublicRulesView />;
      case "store":
        return <PublicStoreView />;
      default:
        return (
          <PublicNewsView
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
          />
        );
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar currentView={currentView} onViewChange={setCurrentView} />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header searchQuery={searchQuery} onSearchChange={setSearchQuery} />

        <main className="flex-1 overflow-y-auto">{renderContent()}</main>
        <Footer />
      </div>
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
