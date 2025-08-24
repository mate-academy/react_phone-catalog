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
  minusIsPressed: boolean;
  setMinusIsPressed: React.Dispatch<React.SetStateAction<boolean>>;
  plusIsPressed: boolean;
  setPlusIsPressed: React.Dispatch<React.SetStateAction<boolean>>;
  cartNumber: number;
  setCartNumber: React.Dispatch<React.SetStateAction<number>>;
  favoriteNumber: number;
  setFavoriteNumber: React.Dispatch<React.SetStateAction<number>>;
  amountItems: number;
  setAmountItems: React.Dispatch<React.SetStateAction<number>>;
  clearIsPressed: boolean;
  setClearIsPressed: React.Dispatch<React.SetStateAction<boolean>>;
};

const MyContext = createContext<MyContextType | null>(null);

export const MyProvider = ({ children }: { children: ReactNode }) => {
  const [iPhones, setIPhones] = useState<ProductFullInfo[]>([]);
  const [tablets, setTablets] = useState<ProductFullInfo[]>([]);
  const [accessories, setAccessories] = useState<ProductFullInfo[]>([]);
  const [products, setProducts] = useState<ProductDemo[]>([]);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [heartIsPressed, setHeartIsPressed] = useState<boolean>(false);
  const [addIsPressed, setAddIsPressed] = useState<boolean>(false);
  const [minusIsPressed, setMinusIsPressed] = useState<boolean>(false);
  const [plusIsPressed, setPlusIsPressed] = useState<boolean>(false);
  const [clearIsPressed, setClearIsPressed] = useState<boolean>(false);
  const [favoriteNumber, setFavoriteNumber] = useState<number>(0);
  const [cartNumber, setCartNumber] = useState<number>(0);
  const [amountItems, setAmountItems] = useState<number>(0);

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

  useEffect(() => {
    const checkTheStorageForCart = () => {
      let total = 0;

      products.forEach(product => {
        const itemJSON = localStorage.getItem(`cart_${product.itemId}`);

        if (itemJSON) {
          const item: ProductDemo = JSON.parse(itemJSON);

          total += item.quantity ?? 1;
        }
      });
      setAmountItems(total);
    };

    checkTheStorageForCart();
  }, [products, addIsPressed, plusIsPressed, minusIsPressed, clearIsPressed]);

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
        minusIsPressed,
        setMinusIsPressed,
        plusIsPressed,
        setPlusIsPressed,
        favoriteNumber,
        setFavoriteNumber,
        cartNumber,
        setCartNumber,
        amountItems,
        setAmountItems,
        clearIsPressed,
        setClearIsPressed,
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
