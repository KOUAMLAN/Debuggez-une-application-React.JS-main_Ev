// src/contexts/DataContext.js

import { createContext, useContext } from "react";

//  Création explicite du contexte (important pour les tests)
export const DataContext = createContext();

// Hook personnalisé pour accéder au contexte dans l'application
export function useData() {
  return useContext(DataContext);
}