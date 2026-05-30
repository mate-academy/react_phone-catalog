import { useEffect, useState } from 'react';
import { Product } from 'types/ProductInfo';
import { useMyContext } from 'components/Contexts/Contexts';
import { client } from 'fetch/fetch';
import { CardSlider } from 'components/CardSlider/CardSlider';
import styles from './BrandNew.module.scss';
import { Loader } from 'components/Loader/Loader';
import NotFound from 'components/NotFound/NotFound';

const BrandNewSection = () => {
  const [newProducts, setNewProducts] = useState<Product[]>([]);
  const { isLoading, setIsLoading, isError, setIsError } = useMyContext();

  useEffect(() => {
    const fetchNewProducts = async () => {
      try {
        setIsLoading(true);
        setIsError(false);

        const products = await client.fetchIPhones();

        const brandNewProducts = products.filter((product: Product) =>
          product.name.includes('iPhone 14'),
        );

        setNewProducts(brandNewProducts);
      } catch (err) {
        setIsError(true);
        console.error('Error fetching new products:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchNewProducts();
  }, [setIsLoading, setIsError]);

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <NotFound />;
  }

  return (
    <div className={styles.section}>
      <CardSlider
        products={newProducts}
        title="Brand new models"
        option={'new'}
      />
    </div>
  );
};
export default BrandNewSection;
