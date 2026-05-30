import { useEffect, useState } from 'react';
import { CardSlider } from 'components/CardSlider/CardSlider';
import { Loader } from 'components/Loader/Loader';
import styles from './HotPrice.module.scss';
import { Product } from 'types/ProductInfo';
import { useMyContext } from 'components/Contexts/Contexts';
import { client } from 'fetch/fetch';
import NotFound from 'components/NotFound/NotFound';

const HotPrice = () => {
  const [descProducts, setDescProducts] = useState<Product[]>([]);
  const { isLoading, setIsLoading, isError, setIsError } = useMyContext();

  useEffect(() => {
    const fetchDescProducts = async () => {
      try {
        setIsLoading(true);
        setIsError(false);

        const products = await client.fetchIPhones();
        const discountProducts = products.filter((product: Product) => {
          const hasDiscount =
            product.priceDiscount !== undefined &&
            product.priceDiscount < product.priceRegular;

          const isTargetModel =
            product.name.toLowerCase().includes('xr') ||
            product.name.toLowerCase().includes('xs');

          return hasDiscount && isTargetModel;
        });

        setDescProducts(discountProducts);
      } catch (err) {
        setIsError(true);
        console.error('Error fetching new products:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDescProducts();
  }, [setIsLoading, setIsError]);

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <NotFound />;
  }
  return (
    <div className={styles.section}>
      <CardSlider products={descProducts} option="hot" title={'Hot Prices'} />
    </div>
  );
};

export default HotPrice;
