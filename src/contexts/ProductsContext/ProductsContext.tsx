import { getProdutsByCategory } from 'modules/shared/services/services';
import { Product } from 'modules/shared/types/Product';
import { createContext, useEffect, useState } from 'react';

type Props = {
  children: React.ReactNode;
};

type DataType = {
  phones: Product[] | null;
  tablets: Product[] | null;
  accessories: Product[] | null;
};

type ProductsContextType = {
  data: DataType;
  loading: boolean;
};

export const ProductsContext = createContext<ProductsContextType>({
  data: {
    phones: null,
    tablets: null,
    accessories: null,
  },
  loading: false,
});

const categories = ['phones', 'tablets', 'accessories'] as const;

export const ProductsProvider: React.FC<Props> = ({ children }) => {
  const [data, setData] = useState<DataType>({
    phones: null,
    tablets: null,
    accessories: null,
  });
  const [loading, setLoading] = useState<boolean>(false);

  const fetchProductsByCategories = async () => {
    setLoading(true);

    try {
      const fetchedData: DataType = {
        phones: null,
        tablets: null,
        accessories: null,
      };

      for (const category of categories) {
        const categoryData = await getProdutsByCategory(category);

        fetchedData[category as keyof DataType] = categoryData;
      }

      setData(fetchedData);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProductsByCategories();
  }, []);

  return (
    <ProductsContext.Provider value={{ data, loading }}>
      {children}
    </ProductsContext.Provider>
  );
};
