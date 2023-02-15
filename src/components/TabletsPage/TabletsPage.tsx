import { useState, useEffect } from 'react';
import { getProducts } from '../../api/products';
import { Product } from '../../types/Product';
import { Error } from '../Error/Error';
import { Footer } from '../Footer/Footer';
import { Header } from '../Header/Header';
import { Loader } from '../Loader';
import { Breadcrumbs } from '../Breadcrumbs/BreadCrumbs';
import { ProductsCatalog } from '../ProductsCatalog/ProductsCatalog';

export const TabletsPage: React.FC = () => {
  const [tablets, setTablets] = useState<Product[]>([]);
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);

      try {
        const getTablets
          = (await getProducts()).filter(item => item.type === 'tablet');

        setTablets(getTablets);
        setIsLoading(false);
      } catch {
        setError('We can not load tablets.');
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  return (
    <>
      <Header />

      <div className="container">
        {isLoading
          ? <Loader />
          : (
            <>
              <Breadcrumbs />
              {error
                ? (
                  <Error />
                )
                : (
                  <ProductsCatalog products={tablets} category="Tablets" />
                )}
            </>
          )}
      </div>

      <Footer />
    </>
  );
};
