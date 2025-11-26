import { useEffect, useState } from 'react';
import { getProductsByCategory } from '../../../../../server/products';
import { Product } from '../../../../../types/Product';
import { Loader } from '../../../../shared/Loader';
import { Slider } from '../../../../shared/Slider/Slider';
import { SliderBtns } from '../../../../shared/SliderBtns';
import styles from './NewProductsSlider.module.scss';

export const NewProductsSlider = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [current, setCurrent] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    setLoading(true);
    getProductsByCategory('phones')
      .then(data => {
        setProducts(data.filter(item => item.name.includes('14')));
      })
      .catch(() => setError('Try again later'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className={styles.productCart}>
      <div className={styles.productCart__content}>
        <h2 className={styles.productCart__title}>Brand new models</h2>
        <SliderBtns products={products} setCurrent={setCurrent} />
      </div>

      {loading && (
        <div className={styles.productCart__loader}>
          <Loader />
        </div>
      )}

      {!loading && products.length > 0 && (
        <Slider products={products} current={current} />
      )}

      {!loading && products.length === 0 && <p>There are no new products</p>}

      {error && <p>{error}</p>}
    </section>
  );
};
