import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import { Item } from '../../types/Item';

type Props = {
  children: ReactNode;
};

type ShopDataProps = {
  phones: {
    data: Item[];
    isLoading: boolean;
    error: string | null;
  };

  tablets: {
    data: Item[];
    isLoading: boolean;
    error: string | null;
  };

  accessories: {
    data: Item[];
    isLoading: boolean;
    error: string | null;
  };

  fetchData: () => void;
};

type DataProps = {
  phones: {
    data: Item[];
    isLoading: boolean;
    error: string | null;
  };

  tablets: {
    data: Item[];
    isLoading: boolean;
    error: string | null;
  };

  accessories: {
    data: Item[];
    isLoading: boolean;
    error: string | null;
  };
};

const initialValues: DataProps = {
  phones: { data: [], isLoading: true, error: null },
  tablets: { data: [], isLoading: true, error: null },
  accessories: { data: [], isLoading: true, error: null },
};

const ShopDataContext = createContext<ShopDataProps | null>(null);

export const useShopDataContext = () => {
  const context = useContext(ShopDataContext);

  if (!context) {
    throw new Error('useMyContext must be used within MyContextProvider');
  }

  return context;
};

export const ShopDataProvider: React.FC<Props> = ({ children }) => {
  const [productsData, setProductsData] = useState(initialValues);
  const { phones, tablets, accessories } = productsData;

  const fetchData = async () => {
    setProductsData(prev => ({
      ...prev,
      phones: { ...prev.phones, isLoading: true, error: null },
      accessories: { ...prev.accessories, isLoading: true, error: null },
      tablets: { ...prev.tablets, isLoading: true, error: null },
    }));

    const promises = [
      fetch('api/phones.json').then(res => res.json()),
      fetch('api/accessories.json').then(res => res.json()),
      fetch('api/tablets.json').then(res => res.json()),
    ];

    const results = await Promise.allSettled(promises);

    const resourceKeys = ['phones', 'accessories', 'tablets'] as const;

    const newStates = results.reduce(
      (acc, result, index) => {
        const key = resourceKeys[index];
        let newStatePart;

        if (result.status === 'fulfilled') {
          newStatePart = {
            data: result.value,
            isLoading: false,
            error: null,
          };
        } else {
          newStatePart = {
            data: initialValues[key].data,
            isLoading: false,
            error: `Something went wrong`,
          };
        }

        return {
          ...acc,
          [key]: newStatePart,
        };
      },
      {} as Pick<typeof initialValues, 'phones' | 'accessories' | 'tablets'>,
    );

    setProductsData(prev => ({
      ...prev,
      ...newStates,
    }));
  };

  useEffect(() => {
      fetchData();
  }, []);

  return (
    <ShopDataContext.Provider
      value={{ phones, tablets, accessories, fetchData }}
    >
      {children}
    </ShopDataContext.Provider>
  );
};
