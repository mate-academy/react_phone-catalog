import React, {
  createContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { Product } from '../types/ProductType';
import { useLocation } from 'react-router-dom';
import { PagesLinkType, PagesType } from '../types/PagesType';
import allProducts from '../../public/api/products.json';
import { Loader } from '../modules/shared/components/Loader';
import { SearchEnum, SortEnum } from '../types/SearchType';

interface PageContextType {
  products: Product[];
}

export const PageContext = createContext<PageContextType>({
  products: [],
});

type Props = {
  children: React.ReactNode;
};

export const PageProvider: React.FC<Props> = ({ children }) => {
  const { pathname, search } = useLocation();
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState<Product[]>([]);
  const originalProducts = useRef<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const filteredProducts = () => {
        if (pathname.includes(PagesType.phones)) {
          return allProducts.filter(
            product =>
              product.category ===
              PagesLinkType[`${PagesType.phones}`].toLowerCase(),
          );
        }

        if (pathname.includes(PagesType.accessories)) {
          return allProducts.filter(
            product =>
              product.category ===
              PagesLinkType[`${PagesType.accessories}`].toLowerCase(),
          );
        }

        return allProducts.filter(
          product =>
            product.category ===
            PagesLinkType[`${PagesType.tablets}`].toLowerCase(),
        );
      };

      setLoading(true);

      await new Promise(resolve => setTimeout(resolve, 1000));

      const resultFilter = filteredProducts();

      setProducts(resultFilter);
      originalProducts.current = resultFilter;
      setLoading(false);
    };

    fetchProducts();
  }, [pathname]);

  useEffect(() => {
    const queryParams = new URLSearchParams(search);
    const query = queryParams.get(SearchEnum.QUERY)?.toLowerCase() || '';
    const sortBy = queryParams.get(SearchEnum.SORT);

    let filtered = [...originalProducts.current];

    const filterProducts = () => {
      if (query) {
        filtered = filtered.filter(product =>
          product.name.toLowerCase().includes(query),
        );
      }

      if (sortBy) {
        filtered.sort((a, b) => {
          switch (sortBy) {
            case SortEnum.Cheapest.toLowerCase():
              return a.price - b.price;
            case SortEnum.Expensivest.toLowerCase():
              return b.price - a.price;
            case SortEnum.Newest.toLowerCase():
              return new Date(b.year).getTime() - new Date(a.year).getTime();
            case SortEnum.Oldest.toLowerCase():
              return new Date(a.year).getTime() - new Date(b.year).getTime();
            default:
              return 0;
          }
        });
      }

      setProducts(filtered);
    };

    filterProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, originalProducts.current]);

  const valueProps = useMemo(
    () => ({
      products,
      setLoading,
    }),
    [products, setLoading],
  );

  return (
    <PageContext.Provider value={valueProps}>
      {loading ? <Loader /> : children}
    </PageContext.Provider>
  );
};
