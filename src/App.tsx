import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";

// Componenti
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";

// Pagine
import HomePage from "./components/HomePage";
import PublicNewsView from "./components/PublicNewsView";
import PublicRulesView from "./components/PublicRulesView";
import PublicStoreView from "./components/PublicStoreView";

const AppContent: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  // Mostra la sidebar solo se non siamo sulla home
  const showSidebar = location.pathname !== "/";
  const showHeader = location.pathname !== "/";

  return (
    <div className="bg-gray-100 flex h-screen w-screen">
      {showSidebar && <Sidebar />}

      {/* Contenuto principale */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {showHeader && (
          <Header searchQuery={searchQuery} onSearchChange={setSearchQuery} />
        )}

        <main className="flex-1 overflow-y-auto p-0">
          <Routes>
            {/* Rotte pubbliche */}
            <Route path="/" element={<HomePage />} />
            <Route
              path="/news"
              element={
                <PublicNewsView
                  searchQuery={searchQuery}
                  onSearchChange={setSearchQuery}
                />
              }
            />
            <Route path="/rules" element={<PublicRulesView />} />
            <Route path="/store" element={<PublicStoreView />} />

            {/* Redirect di default */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
}

export default App;
