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

const AppContext = createContext<{
  prevFavoriteArr: string[] | undefined;
  // eslint-disable-next-line max-len
  setPrevFavoriteArr: React.Dispatch<React.SetStateAction<string[] | undefined>>;

  prevCartPhonesArr: string[] | undefined;
  // eslint-disable-next-line max-len
  setPrevCartPhonesArr: React.Dispatch<React.SetStateAction<string[] | undefined>>;

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

  getPhone: Phones[] | undefined;
  setGetPhone: React.Dispatch<React.SetStateAction<Phones[] | undefined>>;
  visibleElems: Phones[] | undefined;

} | undefined>(undefined);

export const AppProvider = ({ children }: AppContextProps) => {
  const [
    prevFavoriteArr,
    setPrevFavoriteArr,
  ] = useState<string[] | undefined>();

  const [
    prevCartPhonesArr,
    setPrevCartPhonesArr,
  ] = useState<string[] | undefined>();

  const [selectedProduct, setSelectedProduct] = useState<string>();
  const [getPhone, setGetPhone] = useState<Phones[] | undefined>();
  const [sortParam, setSortParam] = useState<string>('Newest');

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

      return getPhone?.slice(firstPageIndex, lastPageIndex);
    }

    return [];
  };

  const visibleElems = visibleElements();

  return (
    <AppContext.Provider value={{

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

      firstItem,
      lastItem,

      sortParam,
      setSortParam,

      getPhone,
      setGetPhone,
      visibleElems,
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
