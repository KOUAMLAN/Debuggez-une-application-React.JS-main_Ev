// src/contexts/DataContext/DataContext.js
import PropTypes from "prop-types";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  useMemo,
} from "react";

// Création et export du contexte
export const DataContext = createContext({});

export const api = {
  loadData: async () => {
    const json = await fetch("/events.json");
    return json.json();
  },
};

export const DataProvider = ({ children }) => {
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const last = useMemo(() => {
    if (!data) return null;
    return data.events?.reduce((mostRecent, event) => {
      if (!mostRecent) return event;
      return new Date(mostRecent.date) > new Date(event.date)
        ? mostRecent
        : event;
    });
  }, [data]);

  const getData = useCallback(async () => {
    try {
      setData(await api.loadData());
    } catch (err) {
      setError(err);
    }
  }, []);

  useEffect(() => {
    if (!data) {
      getData();
    }
  }, [data, getData]);

  return (
    <DataContext.Provider
      /* eslint-disable-next-line react/jsx-no-constructed-context-values */
      value={{
        data,
        error,
        last,
        events: data?.events || [],
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

DataProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

// Hook principal pour les composants
export const useData = () => useContext(DataContext);