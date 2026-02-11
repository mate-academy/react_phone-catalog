import React, { createContext, useContext, useState, Dispatch } from 'react';
import phonesJson from '@public/api/phones.json';
import accessoriesJson from '@public/api/accessories.json';
import tabletsJson from '@public/api/tablets.json';

interface GadgetContextProps {
  gadgets: Gadget[];
  setGadgets: Dispatch<React.SetStateAction<Gadget[]>> | null;
}
export const GadgetsContext = createContext<GadgetContextProps>({
  gadgets: [...phonesJson, ...accessoriesJson, ...tabletsJson],
  setGadgets: null,
});

export const PhonesProvider = ({ children }: { children: React.ReactNode }) => {
  const [gadgets, setGadgets] = useState([
    ...phonesJson,
    ...accessoriesJson,
    ...tabletsJson,
  ]);

  return (
    <GadgetsContext.Provider value={{ gadgets, setGadgets }}>
      {children}
    </GadgetsContext.Provider>
  );
};

export const useGadgets = () => useContext(GadgetsContext);
