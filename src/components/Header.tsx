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
    const url = `https://discord.com/oauth2/authorize?client_id=1405164713981251749&redirect_uri=https%3A%2F%2Fmaracuja-rp.vercel.app%2Fnews&response_type=token&scope=identify`;
    window.location.href = url;
  };

  const handleLogout = () => {
    localStorage.removeItem("discord_token");
    setUser(null);
  };

  return (
    <header className="border-b border-gray-700 px-4 py-3 flex justify-end space-x-4 bg-gray-800">
      {user ? (
        <div className="flex items-center space-x-3 bg-gray-700 px-3 py-1 rounded-full shadow-sm">
          {user.avatar ? (
            <img
              src={`https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`}
              alt="Avatar"
              className="w-8 h-8 rounded-full border-2 border-gray-500"
            />
          ) : (
            <div className="w-8 h-8 bg-gray-500 rounded-full flex items-center justify-center text-white font-bold">
              ?
            </div>
          )}
          <span className="text-white font-medium">{user.username}</span>
          <button
            className="px-3 py-1 bg-red-600 text-white font-semibold rounded-full hover:bg-red-500 transition-colors duration-200"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      ) : (
        <button
          className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-full hover:bg-blue-500 shadow-md transition-all duration-200 transform hover:-translate-y-0.5"
          onClick={handleLogin}
        >
          Login con Discord
        </button>
      )}
    </header>
  );
};

export default Header;
