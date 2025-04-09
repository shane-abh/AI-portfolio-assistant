
"use client";
import { createContext, useContext, useState, ReactNode } from 'react';

interface NavigationContextType {
  isValidAccess: boolean;
  setValidAccess: (value: boolean) => void;
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

export function NavigationProvider({ children }: { children: ReactNode }) {
  const [isValidAccess, setValidAccess] = useState(false);

  return (
    <NavigationContext.Provider value={{ isValidAccess, setValidAccess }}>
      {children}
    </NavigationContext.Provider>
  );
}

export function useNavigation() {
  const context = useContext(NavigationContext);
  if (context === undefined) {
    throw new Error('useNavigation must be used within a NavigationProvider');
  }
  return context;
}