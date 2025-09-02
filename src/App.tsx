import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";

// Componenti
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";

// Pagine
import HomePage from "./components/HomePage";
import Store from "./components/Store";
import PublicNewsView from "./components/PublicNewsView";
import PublicRulesView from "./components/PublicRulesView";
import PublicStoreView from "./components/PublicStoreView";

const AppContent: React.FC<{
  discordToken: string | null;
  setDiscordToken: (t: string | null) => void;
}> = ({ discordToken, setDiscordToken }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const location = useLocation();

  const showSidebar = location.pathname !== "/";
  const showHeader = location.pathname !== "/";

  return (
    <div className="bg-gray-100 flex h-screen w-screen">
      {showSidebar && <Sidebar />}

      <div className="flex-1 flex flex-col overflow-hidden">
        {showHeader && (
          <Header
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            discordToken={discordToken}
            setDiscordToken={setDiscordToken}
          />
        )}

        <main className="flex-1 overflow-y-auto p-0">
          <Routes>
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
            <Route path="/2store" element={<Store />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </div>
  );
};

function App() {
  const [discordToken, setDiscordToken] = useState<string | null>(null);

  // Controlla token in localStorage o dall'URL al primo render
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const params = new URLSearchParams(hash.replace("#", "?"));
      const accessToken = params.get("access_token");
      if (accessToken) {
        localStorage.setItem("discord_token", accessToken);
        setDiscordToken(accessToken);
        window.location.hash = "";
      }
    } else {
      const savedToken = localStorage.getItem("discord_token");
      if (savedToken) setDiscordToken(savedToken);
    }
  }, []);

  return (
    <AuthProvider>
      <Router>
        <AppContent
          discordToken={discordToken}
          setDiscordToken={setDiscordToken}
        />
      </Router>
    </AuthProvider>
  );
}

export default App;
