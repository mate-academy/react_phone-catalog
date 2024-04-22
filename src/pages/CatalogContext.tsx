import React, { useEffect, useState } from 'react';
import { Categories } from '../types/categories';
import { Product } from '../types/phone';
import { TabAccess } from '../types/tablets';

type CatalogType = {
  products: Product[] | undefined;
  setProducts: React.Dispatch<React.SetStateAction<Product[] | undefined>>;
  phones: TabAccess[];
  setPhones: React.Dispatch<React.SetStateAction<TabAccess[]>>;
  tablets: TabAccess[];
  setTablets: React.Dispatch<React.SetStateAction<TabAccess[]>>;
  accessories: TabAccess[];
  setAccessories: React.Dispatch<React.SetStateAction<TabAccess[]>>;
  loader: boolean;
  setLoader: React.Dispatch<React.SetStateAction<boolean>>;
  error: string;
  setError: React.Dispatch<React.SetStateAction<string>>;
  categories: Categories[];
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
  categories: [],
});

type Props = {
  children: React.ReactNode;
};

export const CatalogProvider: React.FC<Props> = ({ children }) => {
  const [products, setProducts] = useState<Product[] | undefined>();
  const [phones, setPhones] = useState([]);
  const [tablets, setTablets] = useState([]);
  const [accessories, setAccessories] = useState([]);
  const [loader, setLoader] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const BASE_URL = 'https://hanna-balabukha.github.io/react_phone-catalog/api/';

  const productsUrl = BASE_URL + 'products.json';

  const phonesUrl = BASE_URL + 'phones.json';

  const tabletsUrl = BASE_URL + 'tablets.json';

  const accessoriesUrl = BASE_URL + 'accessories.json';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(productsUrl);

        if (!response.ok) {
          throw new Error('Error');
        }

        const data = await response.json();

        setProducts(data);
      } catch (er) {
        setError('There are no products yet');
      }
    };

    fetchData();
  }, [productsUrl]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(phonesUrl);

        if (!response.ok) {
          throw new Error('Error');
        }

        const data = await response.json();

        setPhones(data);
      } catch (err) {
        setError('There are no phones yet');
      }
    };

    fetchData();
  }, [phonesUrl]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(tabletsUrl);

        if (!response.ok) {
          throw new Error('Error');
        }

        const data = await response.json();

        setTablets(data);
      } catch (er) {
        setError('There are no tablets yet');
      }
    };

    fetchData();
  }, [tabletsUrl]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(accessoriesUrl);

        if (!response.ok) {
          throw new Error('Error');
        }

        const data = await response.json();

        setAccessories(data);
      } catch (e) {
        setError('There are no accessories yet');
      }
    };

    fetchData();
  }, [accessoriesUrl]);

  const categories = [
    {
      type: 'phones',
      items: phones,
    },
    {
      type: 'tablets',
      items: tablets,
    },
    {
      type: 'accessories',
      items: accessories,
    },
  ];

  console.log(categories);

  const value = {
    products,
    setProducts,
    categories,
    phones,
    setPhones,
    tablets,
    setTablets,
    accessories,
    setAccessories,
    loader,
    setLoader,
    error,
    setError,
  };

  return (
    <CatalogContext.Provider value={value}>{children}</CatalogContext.Provider>
  );



    // const getCategoryCount = useCallback(
  //   (category: Category) => {
  //     if (products === undefined) {
  //       return <NotFoundPage />;
  //     }

  //     const countedItems = products.filter(
  //       item => item.category === category,
  //     ).length;

  //     return countedItems === 1
  //       ? `${countedItems} model`
  //       : `${countedItems} models`;
  //   },
  //   [products],
  // );

  // const phonesCount = getCategoryCount(Category.Phones);
  // const tabletsCount = getCategoryCount(Category.Tablets);
  // const accessoriesCount = getCategoryCount(Category.Accessories);
};
