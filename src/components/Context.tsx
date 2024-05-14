import {
  createContext, useContext, useState, ReactNode,
} from 'react';

interface AppContextProps {
  children: ReactNode;
}

interface Phones {
  id: string;
  category: string;
  phoneId: string;
  itemId: string;
  name: string;
  fullPrice: number;
  price: number;
  screen: string;
  capacity: string;
  color: string;
  ram: string;
  year: number;
  image: string;
}

interface CartProducts {
  id: string;
  count: number;
  fullPrice: number;
}

const AppContext = createContext<{

  favoritePhones: string;
  // eslint-disable-next-line max-len
  setFavoritePhones: React.Dispatch<React.SetStateAction<string>>;

  cartPhones: string;
  // eslint-disable-next-line max-len
  setCartPhones: React.Dispatch<React.SetStateAction<string>>;

  prevFavoriteArr: string[] | undefined;
  // eslint-disable-next-line max-len
  setPrevFavoriteArr: React.Dispatch<React.SetStateAction<string[] | undefined>>;

  prevCartPhonesArr: CartProducts[] | undefined;
  // eslint-disable-next-line max-len
  setPrevCartPhonesArr: React.Dispatch<React.SetStateAction<CartProducts[] | undefined>>;

  selectedProduct: string | undefined;
  // eslint-disable-next-line max-len
  setSelectedProduct: React.Dispatch<React.SetStateAction<string | undefined>>;

  itemsOnPage: number | undefined;
  // eslint-disable-next-line max-len
  setItemsOnPage: React.Dispatch<React.SetStateAction<number | undefined>>;

  currentPage: number;
  // eslint-disable-next-line max-len
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;

  firstItem: number;
  lastItem: number;

  sortParam: string;
  setSortParam: React.Dispatch<React.SetStateAction<string>>;

  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;

  price: number
  setPrice: React.Dispatch<React.SetStateAction<number>>;

  urlState: string | undefined;
  setUrlState: React.Dispatch<React.SetStateAction<string | undefined>>;

  getPhone: Phones[] | undefined;
  setGetPhone: React.Dispatch<React.SetStateAction<Phones[] | undefined>>;
  visibleElems: Phones[] | undefined;
  sortedPhones: Phones[] | undefined;
  setSortedPhones: React.Dispatch<React.SetStateAction<Phones[] | undefined>>;

} | undefined>(undefined);

export const AppProvider = ({ children }: AppContextProps) => {
  const [
    favoritePhones,
    setFavoritePhones,
  ] = useState<string>('');

  const [
    cartPhones,
    setCartPhones,
  ] = useState<string>('');

  const [
    prevFavoriteArr,
    setPrevFavoriteArr,
  ] = useState<string[] | undefined>();

  const [
    prevCartPhonesArr,
    setPrevCartPhonesArr,
  ] = useState<CartProducts[] | undefined>();

  const [selectedProduct, setSelectedProduct] = useState<string>();
  const [getPhone, setGetPhone] = useState<Phones[] | undefined>();
  const [sortedPhones, setSortedPhones] = useState<Phones[] | undefined>();
  const [sortParam, setSortParam] = useState<string>('Newest');
  const [urlState, setUrlState] = useState<string>();
  const [price, setPrice] = useState<number>(0);
  const [query, setQuery] = useState<string>('');

  const [currentPage, setCurrentPage] = useState(1);
  const [
    itemsOnPage,
    setItemsOnPage,
  ] = useState<number | undefined>(getPhone?.length);
  let firstItem = 0;
  let lastItem = 0;

  if (itemsOnPage !== undefined) {
    firstItem = (currentPage - 1) * itemsOnPage + 1;
    lastItem = Math.min(currentPage * itemsOnPage, 42);
  }

  const visibleElements = () => {
    if (itemsOnPage !== undefined) {
      const firstPageIndex = (currentPage - 1) * itemsOnPage;
      const lastPageIndex = firstPageIndex + itemsOnPage;
      const finishPhones = sortedPhones;

      if (query) {
        return finishPhones?.filter(phone => phone.name.includes(query));
      }

      return finishPhones?.slice(firstPageIndex, lastPageIndex);
    }

    return [];
  };

  const visibleElems = visibleElements();

  // useEffect(() => {
  //   visibleElements()
  // }, [query])

  return (
    <AppContext.Provider value={{

      favoritePhones,
      setFavoritePhones,

      cartPhones,
      setCartPhones,

      prevFavoriteArr,
      setPrevFavoriteArr,

      prevCartPhonesArr,
      setPrevCartPhonesArr,

      selectedProduct,
      setSelectedProduct,

      itemsOnPage,
      setItemsOnPage,

      currentPage,
      setCurrentPage,

      price,
      setPrice,

      firstItem,
      lastItem,

      sortParam,
      setSortParam,

      urlState,
      setUrlState,

      getPhone,
      setGetPhone,
      visibleElems,

      query,
      setQuery,

      sortedPhones,
      setSortedPhones,
    }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }

  return context;
};
