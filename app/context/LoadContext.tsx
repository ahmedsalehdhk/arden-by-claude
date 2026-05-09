"use client";

import { createContext, useContext } from "react";

interface LoadContextType {
  isLoaded: boolean;
}

export const LoadContext = createContext<LoadContextType>({ isLoaded: true });
export const useIsLoaded = () => useContext(LoadContext).isLoaded;
