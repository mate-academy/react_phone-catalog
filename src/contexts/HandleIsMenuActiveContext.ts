import { createContext } from 'react';

export const HandleIsMenuActiveContext = (
  createContext<React.Dispatch<React.SetStateAction<boolean>>>(() => {})
);
