import { useNavigate, useSearchParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { GlobalContextType } from '../../types/GlobalContextType';
import { Product } from '../../types/Product';
import { getProducts } from '../../utils/api';
import { CartItemType } from '../../types/CartItemType';

function useLocalStorage<T>(
  key: string,
  startValue: T,
): [T, (value: T) => void] {
  const [data, setData] = useState(() => {
    const dataFromStorage = localStorage.getItem(key);

    if (dataFromStorage === null) {
      return startValue;
    }

    try {
      return JSON.parse(dataFromStorage);
    } catch {
      return startValue;
    }
  });

  const save = (newData: T) => {
    localStorage.setItem(key, JSON.stringify(newData));
    setData(newData);
  };

  return [data, save];
}

export const GlobalContext = React.createContext<GlobalContextType>({
  products: [],
  isLoading: false,
  setIsLoading: () => {},
  errorMessage: '',
  setErrorMessage: () => {},
  localStorage: [],
  setLocalStorage: () => {},
  setProducts: () => {},
  handlePerPageChange: () => {},
  sortingOption: '',
  setSortingOption: () => {},
  cart: [],
  setCart: () => {},
  handleAddingToCart: () => {},
  removingFromCart: () => {},
  handleIncrease: () => {},
  handleDecrease: () => {},
  favList: [],
  setFavList: () => {},
  handleAddingToFav: () => {},
});

type Props = {
  children: React.ReactNode;
};

export const GlobalProvider: React.FC<Props> = ({ children }) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [localStorage, setLocalStorage] = useLocalStorage<Product[]>(
    'cards',
    [],
  );
  const [perPage, setPerPage] = useState(+(searchParams.get('perPage') || 8));
  const [currentPage, setCurrentPage] = useState(
    +(searchParams.get('page') || 1),
  );
  const [sortingOption, setSortingOption] = useState(
    searchParams.get('sort') || 'age',
  );

  const query = searchParams.get('query') || '';
  const [cart, setCart] = useLocalStorage<CartItemType[]>('cart', []);
  const [favList, setFavList] = useLocalStorage<Product[]>('favList', []);

  const handleAddingToFav = (newProduct: Product) => {
    if (favList.find((item) => item.id === newProduct.id)) {
      setFavList([...favList].filter((item) => item.id !== newProduct.id));
    } else {
      setFavList([...favList, newProduct]);
    }
  };

  const handleAddingToCart = (newProduct: Product) => {
    if (
      cart.find((currentProduct) => currentProduct.product.id === newProduct.id)
    ) {
      setCart(
        [...cart].filter(
          (currentProduct) => currentProduct.product.id !== newProduct.id,
        ),
      );
    } else {
      setCart([
        ...cart,
        {
          quantity: 1,
          product: newProduct,
        },
      ]);
    }
  };

  const handleIncrease = (productId: string) => {
    const copyCart = [...cart];

    const currentProduct = copyCart.find(
      (item) => item.product.id === productId,
    );

    if (currentProduct) {
      currentProduct.quantity += 1;
      setCart(copyCart);
    }
  };

  const handleDecrease = (productId: string) => {
    const copyCart = [...cart];

    const currentProduct = copyCart.find(
      (item) => item.product.id === productId,
    );

    if (currentProduct) {
      currentProduct.quantity -= 1;
      setCart(copyCart);
    }
  };

  const removingFromCart = (productId: string) => {
    setCart(cart.filter((item) => item.product.id !== productId));
  };

  const updateUrlParams = (
    newSort: string,
    newPage: number,
    newPerPage: number,
    newQuery: string,
  ) => {
    searchParams.set('sort', newSort);
    searchParams.set('page', String(newPage));
    searchParams.set('perPage', String(newPerPage));
    searchParams.set('query', newQuery);
    navigate({ search: searchParams.toString() });
  };

  const fetchProducts = async (): Promise<Product[]> => {
    try {
      setIsLoading(true);

      const productData = await getProducts();

      switch (sortingOption) {
        case 'name':
          productData.sort((a, b) => a.name.localeCompare(b.name));
          break;

        case 'price':
          productData.sort(
            (a, b) => b.fullPrice
              - (b.fullPrice / 100) * b.price
              - (a.fullPrice - (a.fullPrice / 100) * a.price),
          );
          break;

        default:
          productData.sort((a, b) => b.year - a.year);
          break;
      }

      return productData;
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    updateUrlParams(sortingOption, currentPage, perPage, query);
    setIsLoading(true);

    fetchProducts().then(setProducts);
  }, [sortingOption, currentPage, perPage, query]);

  const handlePerPageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newValue = event.target.value;

    if (newValue === 'all') {
      setPerPage(products.length);
    } else {
      setPerPage(+newValue);
    }

    setCurrentPage(1);
  };

  const value = {
    products,
    isLoading,
    setIsLoading,
    errorMessage,
    setErrorMessage,
    localStorage,
    setLocalStorage,
    setProducts,
    handlePerPageChange,
    sortingOption,
    setSortingOption,
    cart,
    setCart,
    handleAddingToCart,
    removingFromCart,
    handleIncrease,
    handleDecrease,
    favList,
    setFavList,
    handleAddingToFav,
  };

  return (
    <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
  );
};
