import { createContext, ReactNode, useContext, useState } from 'react';

interface SidebarContextProps {
  showStatus: boolean;
  setShowStatus: React.Dispatch<React.SetStateAction<boolean>> | null;
}
const SidebarContext = createContext<SidebarContextProps>({
  showStatus: false,
  setShowStatus: null,
});

export const SidebarProvider = ({ children }: { children: ReactNode }) => {
  const [showStatus, setShowStatus] = useState(false);

  return (
    <SidebarContext.Provider value={{ showStatus, setShowStatus }}>
      {children}
    </SidebarContext.Provider>
  );
};

export const useSidebar = () => useContext(SidebarContext);
