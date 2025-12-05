import { useEffect, useState } from 'react';
import { getProductsByCategory } from '../../../../../server/products';
import { Product } from '../../../../../types/Product';
import { Loader } from '../../../../shared/Loader';
import { SliderBtns } from '../../../../shared/SliderBtns';
import { Slider } from '../Slider';
import styles from './HotPricesSlider.module.scss';

export const HotPricesSlider = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [current, setCurrent] = useState<number>(0);

  useEffect(() => {
    setLoading(true);
    getProductsByCategory('phones')
      .then(data => {
        const filtered = data.filter(
          item => item.priceDiscount < item.priceRegular,
        );

        setProducts(filtered);
      })
      .catch(() => setError('Try again later'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className={styles.hotPriceCart}>
      <div className={styles.hotPriceCart__content}>
        <h2 className={styles.hotPriceCart__title}>Hot prices</h2>
        <div className={styles.hotPriceCart__btnWrapper}>
          <SliderBtns products={products} setCurrent={setCurrent} />
        </div>
      </div>

      {loading && (
        <div className={styles.hotPriceCart__loader}>
          <Loader />
        </div>
      )}

      {!loading && products.length > 0 && (
        <Slider products={products} current={current} />
      )}

      {!loading && products.length === 0 && <p>There are no hot products</p>}

      {error && <p>{error}</p>}
    </section>
  );
};
