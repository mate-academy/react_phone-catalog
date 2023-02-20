import { useState, useEffect } from 'react';
import { getProducts } from '../../api/products';
import { Product } from '../../types/Product';
import { Error } from '../Error/Error';
import { Footer } from '../Footer/Footer';
import { Header } from '../Header/Header';
import { Loader } from '../Loader';
import { Breadcrumbs } from '../Breadcrumbs/Breadcrumbs';
import { ProductsCatalog } from '../ProductsCatalog/ProductsCatalog';

export const PhonesPage: React.FC = () => {
  const [phones, setPhones] = useState<Product[]>([]);
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);

      try {
        const getPhones
          = (await getProducts()).filter(item => item.type === 'phone');

        setPhones(getPhones);
        setIsLoading(false);
      } catch {
        setError('We can not load phones.');
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
                  <ProductsCatalog products={phones} category="Mobile phones" />
                )}
            </>
          )}
      </div>

      <Footer />
    </>
  );
};
