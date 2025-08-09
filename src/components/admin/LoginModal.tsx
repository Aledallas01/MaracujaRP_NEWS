// src/components/admin/LoginModal.tsx

import React, { useState } from "react";
import { X, Eye, EyeOff, Palmtree, Users } from "lucide-react";

interface LoginModalProps {
  onLogin: (username: string, password: string) => boolean;
  onClose: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ onLogin, onClose }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    // Simulate loading
    await new Promise((resolve) => setTimeout(resolve, 800));

    const success = onLogin(username, password);
    if (!success) {
      setError("Credenziali non valide");
    }

    setIsLoading(false);
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-gradient-to-br from-teal-800/95 to-emerald-800/95 backdrop-blur-xl rounded-2xl border border-teal-400/40 w-full max-w-md shadow-2xl shadow-teal-500/20">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-teal-400/30">
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-r from-orange-500 to-amber-500 p-2 rounded-xl shadow-lg">
              <Users className="h-6 w-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">
                Accesso alla DashBoard
              </h2>
              <p className="text-sm text-orange-200">Area amministrativa</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-teal-200 hover:text-white hover:bg-teal-700/50 transition-all duration-200"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Username */}
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-teal-200 mb-2"
            >
              Nome Utente
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 bg-teal-700/50 border border-teal-400/30 rounded-xl text-white placeholder-teal-300 focus:outline-none focus:ring-2 focus:ring-orange-400/60 focus:border-orange-300 transition-all"
              placeholder="Inserisci nome utente"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-teal-200 mb-2"
            >
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 pr-12 bg-teal-700/50 border border-teal-400/30 rounded-xl text-white placeholder-teal-300 focus:outline-none focus:ring-2 focus:ring-orange-400/60 focus:border-orange-300 transition-all"
                placeholder="Inserisci password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-teal-300 hover:text-white transition-colors"
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-500/20 border border-red-400/40 rounded-xl p-4">
              <p className="text-sm text-red-300 flex items-center">
                <span className="w-2 h-2 bg-red-400 rounded-full mr-2"></span>
                {error}
              </p>
            </div>
          )}

          {/* Actions */}
          <div className="flex space-x-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-3 bg-teal-700/50 text-teal-200 rounded-xl hover:bg-teal-600/50 transition-all border border-teal-400/30"
            >
              Annulla
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="flex-1 flex items-center justify-center space-x-2 px-4 py-3 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-xl hover:from-orange-600 hover:to-amber-600 transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  <span>Accesso...</span>
                </>
              ) : (
                <>
                  <Palmtree className="h-4 w-4" />
                  <span>Accedi</span>
                </>
              )}
            </button>
          </div>
        </form>

        {/* Footer */}
        <div className="px-6 py-4 bg-gradient-to-r from-teal-700/40 to-emerald-700/40 rounded-b-2xl border-t border-teal-400/30">
          <p className="text-xs text-teal-300 text-center flex items-center justify-center space-x-2">
            <div className="w-2 h-2 bg-orange-400 rounded-full animate-pulse"></div>
            <span>🔒 Accesso sicuro all'area amministrativa</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
