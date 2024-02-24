import React, {
  Dispatch,
  SetStateAction,
  useState,
} from 'react';
import { Product } from '../types/Product';
import { SortType } from '../types/SortType';
import { SortParamsType } from '../types/SortParamsType';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { CartProduct } from '../types/CartProduct';

type PhonesContextType = {
  products: Product[],
  setProducts: Dispatch<SetStateAction<Product[]>>,
  preparedBrandNewProducts: Product[],
  preparedHotPriceProducts: Product[],
  sortType: SortType,
  setSortType: Dispatch<SetStateAction<SortType>>,
  itemsPerPage: number,
  setItemsPerPage: Dispatch<SetStateAction<number>>,
  sortParams: SortParamsType[],
  perPageParams: number[],
  sortedProducts: () => Product[],
  tabletSearchValue: string,
  setTabletSearchValue: Dispatch<SetStateAction<string>>,
  phoneSearchValue: string,
  setPhoneSearchValue: Dispatch<SetStateAction<string>>,
  filteredProducts: Product[],
  suggestedProducts: Product[],
  setSuggestedProducts: Dispatch<SetStateAction<Product[]>>,
  favoritesId: string[],
  setFavoritesId: (v: string[]) => void,
  cartProducts: CartProduct[],
  setCartProducts: (v: CartProduct[]) => void,
  handleOnLikeClick: (v: string) => void,
  handleOnCartAdd: (v: string) => void,
  removeCartItem: (v: string) => void,
  plusCartItem: (v: string) => void,
  minusCartItem: (v: string) => void,
  getProductCount: (v: string) => number,
};

export const PhonesContext = React.createContext<PhonesContextType>({
  products: [],
  setProducts: () => { },
  preparedHotPriceProducts: [],
  preparedBrandNewProducts: [],
  sortType: SortType.Newest,
  setSortType: () => { },
  itemsPerPage: 0,
  setItemsPerPage: () => { },
  sortParams: [],
  perPageParams: [],
  sortedProducts: () => [],
  tabletSearchValue: '',
  setTabletSearchValue: () => { },
  phoneSearchValue: '',
  setPhoneSearchValue: () => { },
  filteredProducts: [],
  suggestedProducts: [],
  setSuggestedProducts: () => { },
  favoritesId: [],
  setFavoritesId: () => { },
  cartProducts: [],
  setCartProducts: () => { },
  handleOnLikeClick: () => { },
  handleOnCartAdd: () => { },
  removeCartItem: () => { },
  plusCartItem: () => {},
  minusCartItem: () => {},
  getProductCount: () => 0,
});

type Props = {
  children: React.ReactNode,
};

export const PhonesProvider: React.FC<Props> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [sortType, setSortType] = useState<SortType>(SortType.Newest);
  const [itemsPerPage, setItemsPerPage] = useState(16);
  const [tabletSearchValue, setTabletSearchValue] = useState('');
  const [phoneSearchValue, setPhoneSearchValue] = useState('');
  const [suggestedProducts, setSuggestedProducts] = useState<Product[]>([]);
  const [
    favoritesId, setFavoritesId,
  ] = useLocalStorage<string[]>('favorites', []);
  const [
    cartProducts, setCartProducts,
  ] = useLocalStorage<CartProduct[]>('cart', []);

  const sortParams = [
    {
      type: SortType.Newest,
      value: 'age',
    },
    {
      type: SortType.Alphabetically,
      value: 'name',
    },
    {
      type: SortType.Cheapest,
      value: 'price',
    },
  ];

  const perPageParams = [4, 8, 16, 32];

  const preparedHotPriceProducts = products?.filter((product: Product) => (
    product.fullPrice - product.price >= 90
  )) || [];

  const preparedBrandNewProducts = products?.filter((product: Product) => (
    product.year >= 2019
  )) || [];

  const sortedProducts = () => {
    switch (sortType as SortType) {
      case SortType.Alphabetically:
        return [...products].sort((prev, next) => (
          next.name.localeCompare(prev.name)
        ));

      case SortType.Cheapest:
        return [...products]
          .sort((prev, next) => prev.fullPrice - next.fullPrice);

      default:
        return [...products].sort((prev, next) => next.year - prev.year);
    }
  };

  const filteredProducts = sortedProducts().filter(product => (
    product.name.toLowerCase().trim()
      .includes(phoneSearchValue.toLowerCase().trim())
  ));

  const handleOnLikeClick = (id: string) => {
    if (favoritesId.includes(id)) {
      setFavoritesId(favoritesId.filter(favId => favId !== id));
    } else {
      setFavoritesId([...favoritesId, id]);
    }
  };

  const handleOnCartAdd = (itemId: string) => {
    const itemIndex = cartProducts.findIndex(({ id }) => (
      id === itemId
    ));

    setCartProducts(
      itemIndex === -1
        ? (
          [
            ...cartProducts,
            {
              id: itemId,
              count: 1,
            },
          ]
        ) : (
          cartProducts.filter(({ id }) => id !== itemId)
        ),
    );
  };

  const removeCartItem = (itemId: string) => {
    setCartProducts(
      cartProducts.filter(({ id }) => id !== itemId),
    );
  };

  const plusCartItem = (itemId: string) => {
    setCartProducts(
      cartProducts.map(product => {
        if (product.id === itemId) {
          return {
            id: product.id,
            count: product.count + 1,
          };
        }

        return product;
      }),
    );
  };

  const minusCartItem = (itemId: string) => {
    setCartProducts(
      cartProducts.map(product => {
        if (product.id === itemId) {
          return {
            id: product.id,
            count: product.count > 1 ? product.count - 1 : product.count,
          };
        }

        return product;
      }),
    );
  };

  const getProductCount = (itemId: string) => {
    const cartItem = cartProducts.find(({ id }) => id === itemId);

    return cartItem?.count || 0;
  };

  return (
    <PhonesContext.Provider
      value={{
        products,
        setProducts,
        preparedBrandNewProducts,
        preparedHotPriceProducts,
        sortType,
        setSortType,
        itemsPerPage,
        setItemsPerPage,
        sortParams,
        perPageParams,
        sortedProducts,
        tabletSearchValue,
        setTabletSearchValue,
        phoneSearchValue,
        setPhoneSearchValue,
        filteredProducts,
        suggestedProducts,
        setSuggestedProducts,
        favoritesId,
        setFavoritesId,
        cartProducts,
        setCartProducts,
        handleOnCartAdd,
        handleOnLikeClick,
        removeCartItem,
        plusCartItem,
        minusCartItem,
        getProductCount,
      }}
    >
      {children}
    </PhonesContext.Provider>
  );
};
