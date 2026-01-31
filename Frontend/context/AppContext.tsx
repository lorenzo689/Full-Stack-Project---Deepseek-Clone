"use client"; 
import { useUser } from "@clerk/nextjs"; 
import { createContext, useContext, ReactNode } from "react";
import type { UserResource } from "@clerk/types"; 

type AppContextType = {
    user: UserResource | null;
    isSignedIn: boolean;  
}; 

export const AppContext = createContext<AppContextType | undefined>(undefined);

export const useAppContext = (): AppContextType => {
    const context = useContext(AppContext); 

if (!context) {
    throw new Error("useAppContext must be used within an AppContextProvider"); 
}

return context; 
}; 

type AppContextProviderProps = {
    children: ReactNode; 
}


export const AppContextProvider = ({children}: AppContextProviderProps) => {
    const {user, isSignedIn, isLoaded} = useUser(); 

    const value: AppContextType = {
        user: isLoaded ? user: null, 
        isSignedIn: isLoaded ? isSignedIn : false,
    }

    return <AppContext.Provider value = {value}>{children}</AppContext.Provider>
}