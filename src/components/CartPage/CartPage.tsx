import { useState, useEffect } from 'react';
import { getProducts } from '../../api/products';
import { Product } from '../../types/Product';
import { BackButton } from '../BackButton/BackButton';
import { Cart } from '../Cart/Cart';
import { Error } from '../Error/Error';
import { Footer } from '../Footer/Footer';
import { Header } from '../Header/Header';
import { Loader } from '../Loader';

export const CartPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);

      try {
        const loadedProducts = await getProducts();

        setProducts(loadedProducts);
        setIsLoading(false);
      } catch {
        setError('We can not load products.');
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
              <BackButton />

              {error
                ? <Error />
                : <Cart products={products} />}
            </>
          )}
      </div>

      <Footer />
    </>
  );
};
