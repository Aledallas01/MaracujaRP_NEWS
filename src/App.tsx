import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";
import PublicNewsView from "./components/PublicNewsView";
import PublicRulesView from "./components/PublicRulesView";
import PublicStoreView from "./components/PublicStoreView";

const AppContent: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { isAuthenticated } = useAuth();

  return (
    <div className="bg-gray-100 flex h-screen w-screen bg-gray-100">
      {/* Sidebar fissa */}
      <Sidebar />

      {/* Contenuto principale */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header searchQuery={searchQuery} onSearchChange={setSearchQuery} />

        <main className="flex-1 overflow-y-auto p-4">
          <Routes>
            {/* Rotte pubbliche sempre disponibili */}
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

            {/* Esempio di route protetta */}
            {isAuthenticated && (
              <Route path="/admin" element={<div>Area Admin</div>} />
            )}

            {/* Redirect di default */}
            <Route path="*" element={<Navigate to="/news" />} />
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
