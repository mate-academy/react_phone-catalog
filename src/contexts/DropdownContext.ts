import { createContext, Dispatch, SetStateAction } from 'react';

interface DropdownContextType {
  activeDropdown: string | null;
  setActiveDropdown: Dispatch<SetStateAction<string | null>>;
}

const defaultDropdownContext: DropdownContextType = {
  activeDropdown: null,
  setActiveDropdown: () => {},
};

export const DropdownContext = createContext(defaultDropdownContext);
