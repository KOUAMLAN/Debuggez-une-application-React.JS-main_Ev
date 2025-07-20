// src/contexts/DataContext/DataContext.js

import { createContext, useContext } from "react";

// Export nommé du contexte
export const DataContext = createContext();

// Hook pour utiliser le contexte depuis les composants
export const useData = () => useContext(DataContext);