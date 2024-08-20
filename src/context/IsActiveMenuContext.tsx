import { createContext, useMemo, useState } from 'react';

export const IsActiveMenuContext = createContext<{
  isActiveMenu: boolean;
  setIsActiveMenu: React.Dispatch<React.SetStateAction<boolean>>;
}>({
  isActiveMenu: false,
  setIsActiveMenu: () => {},
});

type Props = {
  children: React.ReactNode;
};

export const IsActiveMenuProvider: React.FC<Props> = ({ children }) => {
  const [isActiveMenu, setIsActiveMenu] = useState<boolean>(false);

  const value = useMemo(
    () => ({ isActiveMenu, setIsActiveMenu }),
    [isActiveMenu],
  );

  return (
    <IsActiveMenuContext.Provider value={value}>
      {children}
    </IsActiveMenuContext.Provider>
  );
};
