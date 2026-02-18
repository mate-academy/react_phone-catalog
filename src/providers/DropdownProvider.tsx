import { FC, ReactNode, useState } from 'react';
import { DropdownContext } from '../contexts/DropdownContext';

type Props = {
  children: ReactNode;
};

export const DropdownProvider: FC<Props> = ({ children }) => {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  return (
    <DropdownContext.Provider value={{ activeDropdown, setActiveDropdown }}>
      {children}
    </DropdownContext.Provider>
  );
};
