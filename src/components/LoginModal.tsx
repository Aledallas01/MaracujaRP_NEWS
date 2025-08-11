import React, { useState } from "react";
import { X, LogIn, LogOut } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { login, logout, isAuthenticated, currentUser } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    const success = await login(username, password);

    if (success) {
      setUsername("");
      setPassword("");
      onClose();
    } else {
      setError("Credenziali non valide");
    }

    setIsLoading(false);
  };

  const handleLogout = () => {
    logout();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
      <div className="bg-gray-900 rounded-lg shadow-xl w-full max-w-md mx-4">
        <div className="flex items-center justify-between p-6 border-b border-gray-700">
          <h2 className="text-xl font-semibold text-gray-100">
            {isAuthenticated ? "Profilo Utente" : "Accedi"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-200 transition-colors"
            aria-label="Chiudi"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="p-6">
          {isAuthenticated ? (
            <div className="text-center">
              <div className="mb-4">
                <p className="text-gray-400">Connesso come:</p>
                <p className="text-lg font-semibold text-gray-100">
                  {currentUser}
                </p>
              </div>
              <button
                onClick={handleLogout}
                className="w-full flex items-center justify-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
              >
                <LogOut className="h-4 w-4" />
                Disconnetti
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              {error && (
                <div className="mb-4 p-3 bg-red-900 border border-red-700 rounded-lg text-red-400 text-sm">
                  {error}
                </div>
              )}

              <div className="mb-4">
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-gray-300 mb-2"
                >
                  Username
                </label>
                <input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-700 rounded-lg bg-gray-800 text-gray-200 placeholder-gray-400 focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                  required
                  autoFocus
                />
              </div>

              <div className="mb-6">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-300 mb-2"
                >
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-700 rounded-lg bg-gray-800 text-gray-200 placeholder-gray-400 focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
              >
                <LogIn className="h-4 w-4" />
                {isLoading ? "Accedendo..." : "Accedi"}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
