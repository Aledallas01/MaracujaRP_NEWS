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
  login: (email: string, password: string) => Promise<boolean>;
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

  // Al mount verifica se c'è sessione attiva
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        fetchProfile(session.user.id);
      }
    });

    // Listener per cambiamenti auth (login/logout)
    const { data: listener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (session?.user) {
          fetchProfile(session.user.id);
        } else {
          setCurrentUser(null);
          setIsAuthenticated(false);
          localStorage.removeItem("currentUser");
        }
      }
    );

    return () => {
      listener?.subscription.unsubscribe();
    };
  }, []);

  // Carica profilo dal db e aggiorna stato
  const fetchProfile = async (userId: string) => {
    const { data, error } = await supabase
      .from("users")
      .select("id, username, permissions")
      .eq("id", userId)
      .single();

    if (error) {
      console.error("Errore fetch profilo:", error.message);
      setCurrentUser(null);
      setIsAuthenticated(false);
      localStorage.removeItem("currentUser");
      return;
    }

    if (data) {
      const email = supabase.auth.getUser().data?.user?.email || null;

      setCurrentUser({
        id: data.id,
        email,
        username: data.username,
        permissions: data.permissions || defaultPermissions,
      });
      setIsAuthenticated(true);
      localStorage.setItem("currentUser", JSON.stringify(data));
    }
  };

  // Funzione login con email e password
  const login = async (email: string, password: string): Promise<boolean> => {
    const { error, data } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error("Errore login:", error.message);
      return false;
    }

    if (data.user) {
      await fetchProfile(data.user.id);
      return true;
    }

    return false;
  };

  // Logout
  const logout = async () => {
    await supabase.auth.signOut();
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
