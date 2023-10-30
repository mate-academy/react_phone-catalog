import { createContext, useEffect, useState } from 'react';
import { Phone } from '../types/Phone';
import { PhoneInCart } from '../types/PhoneInCart';

type UsersChoiceContextInterface = {
  likedGadgets: Phone[];
  setLikedGadgets: (value: Phone[] | ((prev: Phone[]) => Phone[])) => void;
  likedGadgetsID: string[];
  setLikedGadgetsID: (value: string[] | ((prev: string[]) => string[])) => void;
  inCart: PhoneInCart[];
  setInCart: (value: PhoneInCart[]
  | ((prev: PhoneInCart[]) => PhoneInCart[])) => void;
  inCartID: string[];
  setInCartID: (value: string[] | ((prev: string[]) => string[])) => void;
};

export const usersChoiceContext = createContext<UsersChoiceContextInterface>({
  likedGadgets: [],
  setLikedGadgets: () => {},
  likedGadgetsID: [],
  setLikedGadgetsID: () => {},
  inCart: [],
  setInCart: () => {},
  inCartID: [],
  setInCartID: () => {},
});

type Props = {
  children: React.ReactNode;
};

export const UsersChoiceContextProvider: React.FC<Props> = ({ children }) => {
  const [likedGadgets, setLikedGadgets] = useState<Phone[]>([]);
  const [likedGadgetsID, setLikedGadgetsID] = useState<string[]>([]);

  const [inCart, setInCart] = useState<PhoneInCart[]>([]);
  const [inCartID, setInCartID] = useState<string[]>([]);

  useEffect(() => {
    const likedGadgetsStorage = localStorage
      .getItem('liked_gadgets_array');
    const likedGadgetsIDStorage = localStorage
      .getItem('liked_gadgets_id_array');

    const inCartStorage = localStorage
      .getItem('cart_array');
    const inCartIDStorage = localStorage
      .getItem('cart_id_array');

    let likedGadgetsRecieved: Phone[] = [];
    let likedGadgetsIDRecieved: string[] = [];

    let inCartRecieved: PhoneInCart[] = [];
    let inCartIDRecieved: string[] = [];

    if (likedGadgetsStorage) {
      likedGadgetsRecieved = JSON.parse(likedGadgetsStorage);
      setLikedGadgets(likedGadgetsRecieved);
    }

    if (likedGadgetsIDStorage) {
      likedGadgetsIDRecieved = JSON.parse(likedGadgetsIDStorage);
      setLikedGadgetsID(likedGadgetsIDRecieved);
    }

    if (inCartStorage) {
      inCartRecieved = JSON.parse(inCartStorage);
      setInCart(inCartRecieved);
    }

    if (inCartIDStorage) {
      inCartIDRecieved = JSON.parse(inCartIDStorage);
      setInCartID(inCartIDRecieved);
    }
  }, []);

  return (
    <usersChoiceContext.Provider value={
      {
        likedGadgets,
        setLikedGadgets,
        likedGadgetsID,
        setLikedGadgetsID,
        inCart,
        setInCart,
        inCartID,
        setInCartID,
      }
    }
    >
      { children }
    </usersChoiceContext.Provider>
  );
};
