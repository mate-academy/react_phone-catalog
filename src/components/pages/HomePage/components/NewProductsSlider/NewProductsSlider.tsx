import { useEffect, useState } from 'react';
import { getProductsByCategory } from '../../../../../server/products';
import { Product } from '../../../../../types/Product';
import { Loader } from '../../../../shared/Loader';
import { SliderBtns } from '../../../../shared/SliderBtns';
import { Slider } from '../Slider';
import styles from './NewProductsSlider.module.scss';

export const NewProductsSlider = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    setLoading(true);
    getProductsByCategory('phones')
      .then(data => {
        const filtered = data.filter(item => item.namespaceId.includes('14'));

        setProducts(filtered);
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
