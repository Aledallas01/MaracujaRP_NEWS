import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
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
  const location = useLocation();

  // Deriva la sezione attiva dalla rotta
  const activeSection = location.pathname.startsWith("/rules")
    ? "rules"
    : location.pathname.startsWith("/store")
    ? "store"
    : "news"; // default

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar activeSection={activeSection} />{" "}
      {/* Sidebar riceve la sezione attiva */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header searchQuery={searchQuery} onSearchChange={setSearchQuery} />

        <main className="flex-1 overflow-y-auto">
          <Routes>
            {!isAuthenticated && (
              <Route
                path="/news"
                element={
                  <PublicNewsView
                    searchQuery={searchQuery}
                    onSearchChange={setSearchQuery}
                  />
                }
              />
            )}

            <Route path="/news" element={<PublicNewsView />} />
            <Route path="/rules" element={<PublicRulesView />} />
            <Route path="/store" element={<PublicStoreView />} />

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
