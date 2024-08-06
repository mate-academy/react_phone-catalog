/* eslint-disable react-refresh/only-export-components */
import { createContext, ReactNode, useContext } from "react";

type Props = {
  children: ReactNode;
};

type AppContextProps = {
  colors: { [key: string]: string };
};

const AppContext = createContext({} as AppContextProps);

export const useAppContext = () => {
  const context = useContext(AppContext);

  if (context === undefined) {
    throw new Error("Context must be used within an AppContextContainerProvider");
  }

  return context;
};

export const AppContextContainer = ({ children }: Props) => {
  const colors = {
    accent: "#f86800",
    secAccent: "#476df4",
    primary: "#0f0f11",
    sec: "#89939a",
    icon: "#b4bdc3",
    elem: "#e2e6e9",
    hoverBg: "#fafbfc",
    white: "#fff",
    green: "#27ae60",
    red: "#eb5757",
  };

  return <AppContext.Provider value={{ colors }}>{children}</AppContext.Provider>;
};
