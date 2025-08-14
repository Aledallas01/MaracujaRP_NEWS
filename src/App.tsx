import React, { useState } from "react";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";
import PublicNewsView from "./components/PublicNewsView";
import PublicRulesView from "./components/PublicRulesView";
import PublicStoreView from "./components/PublicStoreView";

const AppContent: React.FC = () => {
  const [currentView, setCurrentView] = useState("home");
  const [searchQuery, setSearchQuery] = useState("");

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

      <PublicNewsView
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery} // necessario per aggiornare la ricerca
      />
      <Footer />
    </div>
  </div>
);

function App() {
  return <AppContent />;
}

export default App;
