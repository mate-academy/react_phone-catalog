import { createContext, useState } from 'react';
import { ToggleMenu } from '../../types/types';

export const MenuContext = createContext<ToggleMenu>({
  isMenuVisible: false,
  setIsMenuVisible: () => {},
});

type Props = {
  children: React.ReactNode;
};

export const MenuProvider: React.FC<Props> = ({ children }) => {
  const [isMenuVisible, setIsMenuVisible] = useState(false);

  if (isMenuVisible) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = '';
  }

  return (
    <MenuContext.Provider value={{ isMenuVisible, setIsMenuVisible }}>
      {children}
    </MenuContext.Provider>
  );
};
