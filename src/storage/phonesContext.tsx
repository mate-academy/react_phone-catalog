import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from 'react';
import { Phone } from '../types/Phone';
import { getData } from '../client/httpClient';
import { SortType } from '../types/SortType';
import { SortParamsType } from '../types/SortParamsType';

type PhonesContextType = {
  phonesData: Phone[],
  setPhonesData: Dispatch<SetStateAction<Phone[]>>,
  preparedBrandNewProducts: Phone[],
  preparedHotPriceProducts: Phone[],
  sortType: SortType,
  setSortType: Dispatch<SetStateAction<SortType>>,
  itemsPerPage: number,
  setItemsPerPage: Dispatch<SetStateAction<number>>,
  sortParams: SortParamsType[],
  perPageParams: number[],
  sortedProducts: () => Phone[],
  tabletSearchValue: string,
  setTabletSearchValue: Dispatch<SetStateAction<string>>,
  phoneSearchValue: string,
  setPhoneSearchValue: Dispatch<SetStateAction<string>>,
  filteredProducts: Phone[],
};

export const PhonesContext = React.createContext<PhonesContextType>({
  phonesData: [],
  setPhonesData: () => { },
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
});

type Props = {
  children: React.ReactNode,
};

export const PhonesProvider: React.FC<Props> = ({ children }) => {
  const [phonesData, setPhonesData] = useState<Phone[]>([]);
  const [sortType, setSortType] = useState<SortType>(SortType.Newest);
  const [itemsPerPage, setItemsPerPage] = useState(16);
  const [tabletSearchValue, setTabletSearchValue] = useState('');
  const [phoneSearchValue, setPhoneSearchValue] = useState('');

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

  const preparedHotPriceProducts = phonesData?.filter((product: Phone) => (
    product.fullPrice - product.price >= 90
  )) || [];

  const preparedBrandNewProducts = phonesData?.filter((product: Phone) => (
    product.year >= 2019
  )) || [];

  const sortedProducts = () => {
    switch (sortType as SortType) {
      case SortType.Alphabetically:
        return [...phonesData].sort((prev, next) => (
          next.name.localeCompare(prev.name)
        ));

      case SortType.Cheapest:
        return [...phonesData]
          .sort((prev, next) => prev.fullPrice - next.fullPrice);

      default:
        return [...phonesData].sort((prev, next) => next.year - prev.year);
    }
  };

  const filteredProducts = sortedProducts().filter(product => (
    product.name.toLowerCase().trim()
      .includes(phoneSearchValue.toLowerCase().trim())
  ));

  useEffect(() => {
    getData('api/products.json')
      .then(setPhonesData);
  }, [setPhonesData]);

  return (
    <PhonesContext.Provider
      value={{
        phonesData,
        setPhonesData,
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
      }}
    >
      {children}
    </PhonesContext.Provider>
  );
};
