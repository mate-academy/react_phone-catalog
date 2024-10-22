import React, { useEffect } from 'react';
import styles from './newModel.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../../../features/products';
import { RootState } from '../../../app/store'; // Убедитесь, что путь к RootState правильный
import classNames from 'classnames';

export const NewModel: React.FC = () => {
  const dispatch = useDispatch();
  const products = useSelector((state: RootState) => state.products.items);
  const status = useSelector((state: RootState) => state.products.status);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    return <div>Error loading products</div>;
  }

  return (
    <section className={classNames(styles.section, 'container')}>
      <div className="flex">
        <h3 className={styles.section_title}>Brand new models</h3>
        <button disabled />
        <button />
      </div>

      <ul className={styles.section_list}>
        {products
          .filter(product =>
            product.name.toLowerCase().includes('iphone 14 pro'),
          )
          .map(product => (
            <li className={styles.section_item} key={product.id}>
              <img
                src={product.image}
                alt="phone"
                className={styles.section_img}
              />
              <p className={styles.section_name}>{product.name}</p>
              <p className={styles.section_price}>${product.price}</p>
              <p>
                <span> Screen</span> {product.screen}
              </p>
              <p>
                <span>Capacity </span>
                {product.capacity}
              </p>
              <p>
                <span>RAM</span> {product.ram}
              </p>
              <button>Add to cart</button>
              <button className={styles.section_favorite}></button>
            </li>
          ))}
      </ul>
    </section>
  );
};
