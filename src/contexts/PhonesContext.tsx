import React, { useMemo, useState } from 'react';
import { Phone } from '../types/PhoneType';

type PhonesContextType = {
  phones: Phone[];
  setPhones: React.Dispatch<React.SetStateAction<Phone[]>>;
};

export const PhonesContext = React.createContext<PhonesContextType>({
  phones: [],
  setPhones: () => {},
});

type Props = {
  children: React.ReactNode;
};

export const PhonesProvider: React.FC<Props> = ({ children }) => {
  const [phones, setPhones] = useState<Phone[]>([]);

  const value = useMemo(
    () => ({
      phones,
      setPhones,
    }),
    [phones],
  );

  return (
    <PhonesContext.Provider value={value}>{children}</PhonesContext.Provider>
  );
};
