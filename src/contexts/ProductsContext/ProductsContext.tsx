import { getAllProducts } from 'modules/shared/services/services';
import { DataType, ProductsContextType } from 'modules/shared/types/Context';
import { createContext, useEffect, useState } from 'react';

type Props = {
  children: React.ReactNode;
};

export const ProductsContext = createContext<ProductsContextType>({
  data: {
    phones: null,
    tablets: null,
    accessories: null,
  },
  loading: false,
  error: null,
});

const categories = ['phones', 'tablets', 'accessories'] as const;

export const ProductsProvider: React.FC<Props> = ({ children }) => {
  const [data, setData] = useState<DataType>({
    phones: null,
    tablets: null,
    accessories: null,
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProductsByCategories = async () => {
    setLoading(true);

    try {
      const fetchedData: DataType = {
        phones: null,
        tablets: null,
        accessories: null,
      };

      for (const category of categories) {
        const allProducts = await getAllProducts();

        const categoryData = allProducts.filter(product =>
          product.category.includes(category),
        );

        fetchedData[category as keyof DataType] = categoryData;
      }

      setData(fetchedData);
    } catch (err) {
      setError('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProductsByCategories();
  }, []);

  return (
    <ProductsContext.Provider value={{ data, loading, error }}>
      {children}
    </ProductsContext.Provider>
  );
};
