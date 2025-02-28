import { createContext } from 'react';
import { Products } from '../shared/types/Products';
import { Article } from '../shared/types/Article';
import { useDataProduct } from '../hooks/useDataProduct';
// prettier-ignore
export const ProductContext = createContext<(v: Products) => Promise<Article[]>
>(async () => []);

export const ProductProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { checkData } = useDataProduct();

  return (
    <ProductContext.Provider value={checkData}>
      {children}
    </ProductContext.Provider>
  );
};
