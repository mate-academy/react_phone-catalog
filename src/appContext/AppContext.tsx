import React, { useRef } from 'react';

type AppContextProps = {
  app: React.RefObject<HTMLDivElement>;
};

type Props = {
  children: React.ReactNode;
};

export const ContextApp = React.createContext({} as AppContextProps);

export const AppContext: React.FC<Props> = ({ children }) => {
  const app = useRef(null);
  return <ContextApp.Provider value={{ app }}>{children}</ContextApp.Provider>;
};
