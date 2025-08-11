import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { supabase } from "../lib/supabase";

interface Permissions {
  createSections: boolean;
  editSections: boolean;
  deleteSections: boolean;
  createNews: boolean;
  editNews: boolean;
  deleteNews: boolean;
  manageUsers: boolean;
}

interface CurrentUser {
  id: string;
  email: string | null;
  username: string;
  permissions: Permissions;
}

interface AuthContextType {
  currentUser: CurrentUser | null;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context)
    throw new Error("useAuth deve essere usato dentro AuthProvider");
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

const defaultPermissions: Permissions = {
  createSections: false,
  editSections: false,
  deleteSections: false,
  createNews: false,
  editNews: false,
  deleteNews: false,
  manageUsers: false,
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Al mount controlla se c'è un utente salvato in localStorage
  useEffect(() => {
    const savedUser = localStorage.getItem("currentUser");
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
      setIsAuthenticated(true);
    }
  }, []);

  // Funzione per recuperare i permessi dalla tabella permission dato userId
  const fetchPermissions = async (userId: string): Promise<Permissions> => {
    const { data, error } = await supabase
      .from("permission")
      .select("*")
      .eq("user_id", userId)
      .single();

    if (error || !data) {
      console.warn("Permessi non trovati o errore:", error?.message);
      return defaultPermissions;
    }

    // Torna solo i campi dei permessi (senza id e user_id)
    const {
      createSections,
      editSections,
      deleteSections,
      createNews,
      editNews,
      deleteNews,
      manageUsers,
    } = data;

    return {
      createSections,
      editSections,
      deleteSections,
      createNews,
      editNews,
      deleteNews,
      manageUsers,
    };
  };

  // Login da tabella users + permessi da permission
  const login = async (
    username: string,
    password: string
  ): Promise<boolean> => {
    const { data: userData, error } = await supabase
      .from("users")
      .select("*")
      .eq("username", username)
      .eq("password", password) // ⚠️ Usa hash in produzione
      .single();

    if (error || !userData) {
      console.error("Errore login:", error?.message);
      return false;
    }

    // Prendi permessi dalla tabella permission
    const permissions = await fetchPermissions(userData.id);

    const user: CurrentUser = {
      id: userData.id,
      email: null, // Non hai email nella tabella users, se la aggiungi mettila qui
      username: userData.username,
      permissions,
    };

    setCurrentUser(user);
    setIsAuthenticated(true);
    localStorage.setItem("currentUser", JSON.stringify(user));
    return true;
  };

  // Logout
  const logout = () => {
    setCurrentUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem("currentUser");
  };

  return (
    <AuthContext.Provider
      value={{ currentUser, login, logout, isAuthenticated }}
    >
      {children}
    </AuthContext.Provider>
  );
};
