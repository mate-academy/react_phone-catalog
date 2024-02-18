import React, {
  Dispatch,
  SetStateAction,
  useState,
} from 'react';
import { Product } from '../types/Product';
import { SortType } from '../types/SortType';
import { SortParamsType } from '../types/SortParamsType';

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
  setSuggestedProducts: Dispatch<SetStateAction<Product[]>>
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
  setTabletSearchValue: () => {},
  phoneSearchValue: '',
  setPhoneSearchValue: () => { },
  filteredProducts: [],
  suggestedProducts: [],
  setSuggestedProducts: () => {},
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
      }}
    >
      {children}
    </PhonesContext.Provider>
  );
};
