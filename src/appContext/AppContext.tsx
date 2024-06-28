import React, { RefObject, useEffect, useRef, useState } from 'react';
import { Product } from '../types/Product';
import { Item } from '../types/Item';
import {
  SetURLSearchParams,
  useLocation,
  useSearchParams,
} from 'react-router-dom';
import { ItemWithQuantity } from '../types/ItemWithQuantity';
import { SortBy } from '../types/SortBy';

type AppContextProps = {
  app: React.RefObject<HTMLDivElement>;
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  products: Product[];
  productsTotalNumber: number;
  phonesTotalNumber: number;
  phones: Item[];
  setPhones: React.Dispatch<React.SetStateAction<Item[]>>;
  tablets: Item[];
  setTablets: React.Dispatch<React.SetStateAction<Item[]>>;
  tabletsTotalNumber: number;
  accessoriesTotalNumber: number;
  accessories: Item[];
  setAccessories: React.Dispatch<React.SetStateAction<Item[]>>;
  isLoadingPoducts: boolean;
  setIsLoadingPoducts: React.Dispatch<React.SetStateAction<boolean>>;
  isLoadingPhones: boolean;
  setIsLoadingPhones: React.Dispatch<React.SetStateAction<boolean>>;
  isLoadingTablets: boolean;
  setIsLoadingTablets: React.Dispatch<React.SetStateAction<boolean>>;
  isLoadingAccessories: boolean;
  setIsLoadingAccessories: React.Dispatch<React.SetStateAction<boolean>>;
  setAccessoriesTotalNumber: React.Dispatch<React.SetStateAction<number>>;
  setPhonesTotalNumber: React.Dispatch<React.SetStateAction<number>>;
  setProductsTotalNumber: React.Dispatch<React.SetStateAction<number>>;
  setTabletsTotalNumber: React.Dispatch<React.SetStateAction<number>>;
  cart: ItemWithQuantity[];
  fav: Item[];
  setCart: React.Dispatch<React.SetStateAction<ItemWithQuantity[]>>;
  setFav: React.Dispatch<React.SetStateAction<Item[]>>;
  handleAddFav: (newItem: Item) => void;
  handleAddCart: (newItem: Item) => void;
  backToTop: RefObject<HTMLDivElement>;
  itemsPerPage: string;
  setItemsPerPage: React.Dispatch<React.SetStateAction<string>>;
  activePage: number;
  setActivePage: React.Dispatch<React.SetStateAction<number>>;
  searchParams: URLSearchParams;
  setSearchParams: SetURLSearchParams;
  selectedOption: SortBy;
  setSelectedOption: React.Dispatch<React.SetStateAction<SortBy>>;
  handleChangeSort: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  handleChangeItems: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  handlePageChange: (number: number) => void;
};

type Props = {
  children: React.ReactNode;
};

export const ContextApp = React.createContext({} as AppContextProps);

export const AppContext: React.FC<Props> = ({ children }) => {
  const app = useRef(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const backToTop = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const [products, setProducts] = useState<Product[]>([]);
  const [phones, setPhones] = useState<Item[]>([]);
  const [tablets, setTablets] = useState<Item[]>([]);
  const [accessories, setAccessories] = useState<Item[]>([]);
  const [isLoadingPoducts, setIsLoadingPoducts] = useState(true);
  const [isLoadingPhones, setIsLoadingPhones] = useState(true);
  const [isLoadingTablets, setIsLoadingTablets] = useState(true);
  const [isLoadingAccessories, setIsLoadingAccessories] = useState(false);
  const [accessoriesTotalNumber, setAccessoriesTotalNumber] = useState(0);
  const [phonesTotalNumber, setPhonesTotalNumber] = useState(0);
  const [productsTotalNumber, setProductsTotalNumber] = useState(0);
  const [tabletsTotalNumber, setTabletsTotalNumber] = useState(0);

  const perPage = searchParams.get('perPage');
  const page = searchParams.get('page');
  const option = searchParams.get('sortBy');

  const [selectedOption, setSelectedOption] = useState<SortBy>('newest');
  const [itemsPerPage, setItemsPerPage] = useState('all');
  const [activePage, setActivePage] = useState(1);

  const [cart, setCart] = useState<ItemWithQuantity[]>(() => {
    const cart = localStorage.getItem('cart');

    return cart ? JSON.parse(cart) : [];
  });
  const [fav, setFav] = useState<Item[]>(() => {
    const fav = localStorage.getItem('fav');

    return fav ? JSON.parse(fav) : [];
  });

  const handleChangeSort = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(e.target.value as SortBy);

    if (e.target.value === 'newest') {
      searchParams.delete('sortBy');
      setSearchParams(new URLSearchParams(searchParams));
    }
    setSearchParams(new URLSearchParams(searchParams));
  };

  const handleChangeItems = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setItemsPerPage(e.target.value);
    setActivePage(1);
    searchParams.delete('page');
    
    if (itemsPerPage !== 'all') {
      searchParams.set('perPage', itemsPerPage);
    }

    if (e.target.value === 'all') {
      searchParams.delete('perPage');
    }

    setSearchParams(new URLSearchParams(searchParams));
  };

  const handlePageChange = (number: number) => {
    setActivePage(number);

    if (activePage !== 1) {
      searchParams.set('page', activePage.toString());
    }

    if (number === 1) {
      searchParams.delete('page');
      setSearchParams(new URLSearchParams(searchParams));
    }
    setSearchParams(new URLSearchParams(searchParams));
  };

  const handleAddFav = (newItem: Item) => {
    if (fav.find(item => item.id === newItem.id)) {
      setFav(prevState => {
        const updated = [...prevState].filter(item => item.id !== newItem.id);
        localStorage.setItem('fav', JSON.stringify(updated));

        return updated;
      });
    } else {
      setFav(prevState => {
        const updated = [...prevState, { ...newItem }];
        localStorage.setItem('fav', JSON.stringify(updated));

        return updated;
      });
    }
  };

  const handleAddCart = (newItem: Item): ItemWithQuantity | null => {
    const itemExists = cart.find(item => item.id === newItem.id);

    if (!itemExists) {
      const newItemWithQuantity: ItemWithQuantity = { ...newItem, quantity: 1 };
      setCart(prevState => {
        const updated = [...prevState, newItemWithQuantity];
        localStorage.setItem('cart', JSON.stringify(updated));
        return updated;
      });
      return newItemWithQuantity;
    } else {
      return null;
    }
  };

  useEffect(() => {
    if (option) {
      setSelectedOption(option as SortBy);

    }
    if (perPage) {
      setItemsPerPage(perPage);
    }
    if (page) {
      setActivePage(+page);
    }

    if (option === 'newest') {
      searchParams.delete('sortBy');
      setSearchParams(new URLSearchParams(searchParams));
    }

    if (perPage === 'all') {
      searchParams.delete('perPage');
      setSearchParams(new URLSearchParams(searchParams));
    }

    if (page === '1') {
      searchParams.delete('page');
      setSearchParams(new URLSearchParams(searchParams));
    }
  }, [accessories, tablets, phones, location.pathname]);

  useEffect(() => {
    setIsLoadingPoducts(true);
    fetch('./api/products.json')
      .then(response => response.json())
      .then(response => {
        setProducts(response);
        setProductsTotalNumber(response.length);
      })
      .catch(err => {
        throw new Error(err);
      })
      .finally(() => {
        setIsLoadingPoducts(false);
      });
  }, [location.pathname]);

  useEffect(() => {
    setIsLoadingAccessories(true);
    fetch('./api/accessories.json')
      .then(response => response.json())
      .then(response => {
        setAccessories(response);
        setAccessoriesTotalNumber(response.length);
      })
      .catch(err => {
        throw new Error(err);
      })
      .finally(() => {
        setIsLoadingAccessories(false);
      });
  }, [location.pathname]);

  useEffect(() => {
    setIsLoadingPhones(true);
    fetch('./api/phones.json')
      .then(response => response.json())
      .then(response => {
        setPhones(response);
        setPhonesTotalNumber(response.length);
      })
      .catch(err => {
        throw new Error(err);
      })
      .finally(() => {
        setIsLoadingPhones(false);
      });
  }, [location.pathname]);

  useEffect(() => {
    setIsLoadingTablets(true);
    fetch('./api/tablets.json')
      .then(response => response.json())
      .then(response => {
        setTablets(response);
        setTabletsTotalNumber(response.length);
      })
      .catch(err => {
        throw new Error(err);
      })
      .finally(() => {
        setIsLoadingTablets(false);
      });
  }, [location.pathname]);

  useEffect(() => {
    if (selectedOption !== 'newest') {
      searchParams.set('sortBy', selectedOption);
    }

    if (itemsPerPage !== 'all') {
      searchParams.set('perPage', itemsPerPage);
    }

    if (activePage !== 1) {
      searchParams.set('page', activePage.toString());
    }

    // if (option === 'newest') {
    //   searchParams.delete('sortBy');
    //   setSearchParams(new URLSearchParams(searchParams));
    // }

    // if (perPage === 'all') {
    //   searchParams.delete('perPage');
    //   setSearchParams(new URLSearchParams(searchParams));
    // }

    // if (page === '1') {
    //   searchParams.delete('page');
    //   setSearchParams(new URLSearchParams(searchParams));
    // }

    console.log('searchParams', searchParams.toString());

    setSearchParams(new URLSearchParams(searchParams));
  }, [itemsPerPage, activePage, selectedOption, location.pathname]);

  return (
    <ContextApp.Provider
      value={{
        handleChangeItems,
        handleChangeSort,
        handlePageChange,
        selectedOption,
        setSelectedOption,
        searchParams,
        setSearchParams,
        activePage,
        itemsPerPage,
        setActivePage,
        setItemsPerPage,
        backToTop,
        handleAddCart,
        handleAddFav,
        cart,
        fav,
        setCart,
        setFav,
        setAccessoriesTotalNumber,
        setPhonesTotalNumber,
        setProductsTotalNumber,
        setTabletsTotalNumber,
        isLoadingAccessories,
        isLoadingPhones,
        isLoadingPoducts,
        isLoadingTablets,
        setIsLoadingAccessories,
        setIsLoadingPhones,
        setIsLoadingPoducts,
        setIsLoadingTablets,
        accessories,
        accessoriesTotalNumber,
        setAccessories,
        tabletsTotalNumber,
        setTablets,
        tablets,
        app,
        phones,
        phonesTotalNumber,
        setPhones,
        productsTotalNumber,
        products,
        setProducts,
      }}
    >
      {children}
    </ContextApp.Provider>
  );
};
