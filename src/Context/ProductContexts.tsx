import {
  createContext,
  useState,
  ReactNode,
  useContext,
  useEffect,
} from 'react';
import { ProductFullInfo } from '../types/ProductFullInfo';
import { ProductDemo } from '../types/ProductDemo';
import { client } from '../fetch/fetchGoods';

type MyContextType = {
  iPhones: ProductFullInfo[];
  setIPhones: (list: ProductFullInfo[]) => void;
  tablets: ProductFullInfo[];
  setTablets: (list: ProductFullInfo[]) => void;
  accessories: ProductFullInfo[];
  setAccessories: (list: ProductFullInfo[]) => void;
  products: ProductDemo[];
  setProducts: (list: ProductDemo[]) => void;
  order: ProductDemo[];
  setOrder: (list: ProductDemo[]) => void;
  isMenuOpen: boolean;
  setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  isError: boolean;
  setIsError: React.Dispatch<React.SetStateAction<boolean>>;
  heartIsPressed: boolean;
  setHeartIsPressed: React.Dispatch<React.SetStateAction<boolean>>;
  addIsPressed: boolean;
  setAddIsPressed: React.Dispatch<React.SetStateAction<boolean>>;
};

const MyContext = createContext<MyContextType | null>(null);

export const MyProvider = ({ children }: { children: ReactNode }) => {
  const [iPhones, setIPhones] = useState<ProductFullInfo[]>([]);
  const [tablets, setTablets] = useState<ProductFullInfo[]>([]);
  const [accessories, setAccessories] = useState<ProductFullInfo[]>([]);
  const [products, setProducts] = useState<ProductDemo[]>([]);
  const [order, setOrder] = useState<ProductDemo[]>([]);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [heartIsPressed, setHeartIsPressed] = useState<boolean>(false);
  const [addIsPressed, setAddIsPressed] = useState<boolean>(false);

  useEffect(() => {
    const makeProductsList = async () => {
      try {
        const resultProducts = await client.fetchProducts();

        setProducts(resultProducts);
      } catch {
        throw new Error();
      }
    };

    makeProductsList();
  }, []);
  //----------

  //-----------
  console.log('render');

  return (
    <MyContext.Provider
      value={{
        iPhones,
        setIPhones,
        tablets,
        setTablets,
        accessories,
        setAccessories,
        products,
        setProducts,
        order,
        setOrder,
        isMenuOpen,
        setIsMenuOpen,
        isLoading,
        setIsLoading,
        isError,
        setIsError,
        heartIsPressed,
        setHeartIsPressed,
        addIsPressed,
        setAddIsPressed,
      }}
    >
      {children}
    </MyContext.Provider>
  );
};

export const useMyContext = () => {
  const context = useContext(MyContext);

  if (!context) {
    throw new Error('useMyContext must be used within a MyProvider');
  }

  return context;
};
