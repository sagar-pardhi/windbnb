"use client";

import { Stays } from "@/types";
import {
  useState,
  createContext,
  useContext,
  useEffect,
  SetStateAction,
} from "react";

interface AppContext {
  staysData: Stays[];
  setStaysData: (value: SetStateAction<Stays[]>) => void;
  filteredData: Stays[];
  setFilteredData: (value: SetStateAction<Stays[]>) => void;
}

const AppContext = createContext<AppContext | null>(null);

export const AppContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [staysData, setStaysData] = useState<Stays[]>([]);
  const [filteredData, setFilteredData] = useState<Stays[]>([]);

  useEffect(() => {
    async function getStaysData() {
      const response = await fetch(`/api/stays`);
      const data = await response.json();
      setStaysData(data);
      setFilteredData(data);
    }

    getStaysData();
  }, []);

  const value = {
    staysData,
    setStaysData,
    filteredData,
    setFilteredData,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used with AppContextProvider");
  }
  return context;
};
