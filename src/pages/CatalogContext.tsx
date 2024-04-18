import React, { useCallback, useEffect, useState } from 'react';
import { Category } from '../types/category';
import { Phone } from '../types/phone';
import { TabAndAccess } from '../types/tablets';
import { NotFoundPage } from './NotFoundPage/NotFoundPage';

type CatalogType = {
  products: Phone[] | undefined;
  setProducts: React.Dispatch<React.SetStateAction<Phone[] | undefined>>;
  phones: Phone[] | undefined;
  setPhones: React.Dispatch<React.SetStateAction<Phone[] | undefined>>;
  tablets: TabAndAccess[] | undefined;
  setTablets: React.Dispatch<React.SetStateAction<TabAndAccess[] | undefined>>;
  accessories: TabAndAccess[] | undefined;
  setAccessories: React.Dispatch<
    React.SetStateAction<TabAndAccess[] | undefined>
  >;
  loader: boolean;
  setLoader: React.Dispatch<React.SetStateAction<boolean>>;
  error: string;
  setError: React.Dispatch<React.SetStateAction<string>>;
  phonesCount: string | React.JSX.Element,
  tabletsCount: string | React.JSX.Element,
  accessoriesCount: string | React.JSX.Element,
};

export const CatalogContext = React.createContext<CatalogType>({
  products: [],
  setProducts: () => {},
  phones: [],
  setPhones: () => {},
  tablets: [],
  setTablets: () => {},
  accessories: [],
  setAccessories: () => {},
  loader: false,
  setLoader: () => {},
  error: '',
  setError: () => {},
  phonesCount: '',
  tabletsCount: '',
  accessoriesCount: '',
});

type Props = {
  children: React.ReactNode;
};

export const CatalogProvider: React.FC<Props> = ({ children }) => {
  const [products, setProducts] = useState<Phone[] | undefined>();
  const [phones, setPhones] = useState<Phone[] | undefined>();
  const [tablets, setTablets] = useState<TabAndAccess[] | undefined>();
  const [accessories, setAccessories] = useState<TabAndAccess[] | undefined>();
  const [loader, setLoader] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const productsUrl =
    'https://mate-academy.github.io/react_phone-catalog/_new/products.json';

  // const phonesUrl =
  //   'https://mate-academy.github.io/Hanna-Balabukha.github.io/react_phone-catalog/_new/phones.json';

  // const tabletsUrl =
  //   'https://mate-academy.github.io/Hanna-Balabukha.github.io/react_phone-catalog/_new/tablets.json';

  // const accessoriesUrl =
  //   'https://mate-academy.github.io/Hanna-Balabukha.github.io/react_phone-catalog/_new/accessories.json';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(productsUrl);

        if (!response.ok) {
          throw new Error('Error');
        }

        const data = await response.json();

        setProducts(data);
      } catch (error) {
        setError('There are no products yet');
      }
    };

    fetchData();
  }, []);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await fetch(phonesUrl);

  //       if (!response.ok) {
  //         throw new Error('Error');
  //       }

  //       const data = await response.json();

  //       setPhones(data);
  //     } catch (error) {
  //       setError('There are no phones yet');
  //     }
  //   };

  //   fetchData();
  // }, []);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await fetch(tabletsUrl);

  //       if (!response.ok) {
  //         throw new Error('Error');
  //       }

  //       const data = await response.json();

  //       setTablets(data);
  //     } catch (error) {
  //       setError('There are no tablets yet');
  //     }
  //   };

  //   fetchData();
  // }, []);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await fetch(accessoriesUrl);

  //       if (!response.ok) {
  //         throw new Error('Error');
  //       }

  //       const data = await response.json();

  //       setAccessories(data);
  //     } catch (error) {
  //       setError('There are no accessories yet');
  //     }
  //   };

  //   fetchData();
  // }, []);

  const getCategoryCount = useCallback((category: Category) => {
    if (products === undefined) {
      return <NotFoundPage />;
    }

    const countedItems = products
      .filter(item => item.category === category).length;

    return countedItems === 1
      ? `${countedItems} model`
      : `${countedItems} models`;
  }, [products]);

  const phonesCount = getCategoryCount(Category.Phones);
  const tabletsCount = getCategoryCount(Category.Tablets);
  const accessoriesCount = getCategoryCount(Category.Accessories);

  const value = {
    products,
    setProducts,
    phones,
    setPhones,
    tablets,
    setTablets,
    accessories,
    setAccessories,
    phonesCount,
    tabletsCount,
    accessoriesCount,
    loader,
    setLoader,
    error,
    setError,
  };

  return (
    <CatalogContext.Provider value={value}>{children}</CatalogContext.Provider>
  );
};
