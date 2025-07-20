// src/contexts/DataContext/DataContext.js

import { createContext, useContext } from "react";

// Création du contexte
export const DataContext = createContext();

// Hook d'accès aux données du contexte
export const useData = () => useContext(DataContext);