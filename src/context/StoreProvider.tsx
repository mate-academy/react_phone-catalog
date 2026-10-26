import { useEffect, useState } from 'react';
import { useCart } from 'src/hooks/useCart';
import { getAll } from 'src/API/client';
import { StoreContext } from './StoreContext';
import { useFavourites } from 'src/hooks/useFavourites';
import { Accessories, Phone, Product, Tablet } from 'src/types/Types';

type Props = {
  children: React.ReactNode;
};

export const StoreProvider: React.FC<Props> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [productByCategory, setProductByCategory] = useState<{
    phones: Phone[];
    accessories: Accessories[];
    tablets: Tablet[];
  }>({ phones: [], accessories: [], tablets: [] });
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const loadData = async () => {
    setIsLoading(true);
    setHasError(false);

    try {
      const data = await getAll();

      await new Promise(resolve => setTimeout(resolve, 500));

      setProducts(data.products);
      setProductByCategory(data.productByCategory);
    } catch {
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const { favourites, toggleFavourites } = useFavourites();
  const { cartProducts, cartDispatch, addToCart, toggleCart } =
    useCart(products);

  return (
    <StoreContext.Provider
      value={{
        products,
        productByCategory,
        isLoading,
        hasError,
        reload: loadData,
        favourites,
        toggleFavourites,
        cartProducts,
        cartDispatch,
        addToCart,
        toggleCart,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};
