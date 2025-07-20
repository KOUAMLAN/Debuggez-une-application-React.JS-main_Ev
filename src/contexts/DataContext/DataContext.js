// src/contexts/DataContext/DataContext.js

import { createContext, useContext } from "react";

// Export du contexte nommé spécialement pour les tests
export const DataContext = createContext();

// Hook utilisé dans l'application pour accéder facilement aux données
export const useData = () => useContext(DataContext);