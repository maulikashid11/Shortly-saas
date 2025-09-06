"use client"
import { createContext } from "react";
import { toast } from "react-toastify";

export const AppContext = createContext();

const AppProvider = ({ children }) => {
    const registerUser = async (session) => {
        const res = await fetch('/api/register', {
            method: 'POST',
            body: JSON.stringify({ ...session?.user })
        })
        const data = await res.json();
        if (data.success) {
            toast.success(data.message)
        }
    }

    const value = { registerUser }
    return <AppContext.Provider value={value}>
        {children}
    </AppContext.Provider>
}

export default AppProvider;