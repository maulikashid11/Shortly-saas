"use client"
import { createContext, ReactNode } from "react";
import { toast } from "react-toastify";
import { Session } from "next-auth";

interface AppContextType {
  registerUser: (session: Session | null) => Promise<void>;
}

export const AppContext = createContext<AppContextType>({
  registerUser: async () => {},
});

interface AppProviderProps {
  children: ReactNode;
}

const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const registerUser = async (session: Session | null) => {
    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ ...session?.user }),
      });

      const data = await res.json();
      if (data.success) {
        toast.success(data.message);
      }
    } catch (error) {
      console.error("Register user error:", error);
      toast.error("Something went wrong while registering user.");
    }
  };

  const value: AppContextType = { registerUser };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
