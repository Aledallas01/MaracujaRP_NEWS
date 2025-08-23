import React, { useState, useEffect } from "react";

interface DiscordUser {
  username: string;
  discriminator: string;
  avatar: string | null;
  id: string;
}

const CLIENT_ID = "TUO_CLIENT_ID_DISCORD"; // sostituisci con il tuo client id
const REDIRECT_URI = "http://localhost:3000"; // sostituisci con l'URL della tua app
const SCOPE = "identify";

const Header: React.FC = () => {
  const [user, setUser] = useState<DiscordUser | null>(null);

  // Controlla se c’è token salvato
  useEffect(() => {
    const token = localStorage.getItem("discord_token");
    if (token) {
      fetchDiscordUser(token);
    }

    // Controlla se siamo tornati dal redirect con un token
    const hash = window.location.hash;
    if (hash) {
      const params = new URLSearchParams(hash.replace("#", "?"));
      const accessToken = params.get("access_token");
      if (accessToken) {
        localStorage.setItem("discord_token", accessToken);
        fetchDiscordUser(accessToken);
        window.location.hash = ""; // pulisci hash
      }
    }
  }, []);

  const fetchDiscordUser = async (token: string) => {
    const res = await fetch("https://discord.com/api/users/@me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (res.ok) {
      const data = await res.json();
      setUser(data);
    } else {
      console.error("Token non valido");
      localStorage.removeItem("discord_token");
    }
  };

  const handleLogin = () => {
    const url = `https://discord.com/oauth2/authorize?client_id=1405164713981251749&response_type=code&redirect_uri=https%3A%2F%2Fmaracuja-rp.vercel.app%2Fnews&scope=identify`;
    window.location.href = url;
  };

  const handleLogout = () => {
    localStorage.removeItem("discord_token");
    setUser(null);
  };

  return (
    <header className="border-b border-gray-700 px-4 py-3 flex justify-end space-x-4 bg-gray-800">
      {user ? (
        <div className="flex items-center space-x-2">
          {user.avatar ? (
            <img
              src={`https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`}
              alt="Avatar"
              className="w-8 h-8 rounded-full"
            />
          ) : (
            <div className="w-8 h-8 bg-gray-600 rounded-full"></div>
          )}
          <span className="text-white">{user.username}</span>
          <button
            className="px-2 py-1 bg-red-600 rounded hover:bg-red-500"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      ) : (
        <button
          className="px-3 py-1 bg-blue-600 rounded hover:bg-blue-500"
          onClick={handleLogin}
        >
          Login con Discord
        </button>
      )}
    </header>
  );
};

export default Header;
