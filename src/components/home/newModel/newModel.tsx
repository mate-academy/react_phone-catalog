/* eslint-disable @typescript-eslint/indent */
import React, { useEffect } from 'react';
import styles from './newModel.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../../../features/products';
import { AppDispatch, RootState } from '../../../app/store';
import classNames from 'classnames';

interface NewModelProps {
  filterName?: string;
  sortByPriceDifference?: boolean;
  title: string;
}

export const NewModel: React.FC<NewModelProps> = ({
  filterName,
  sortByPriceDifference,
  title,
}) => {
  const dispatch: AppDispatch = useDispatch();
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

  const filteredProducts = filterName
    ? products.filter(product =>
        product.name.toLowerCase().includes(filterName.toLowerCase()),
      )
    : products;

  const sortedProducts = sortByPriceDifference
    ? filteredProducts.slice().sort((a, b) => {
        const aDifference = a.fullPrice - a.price;
        const bDifference = b.fullPrice - b.price;

        return bDifference - aDifference;
      })
    : filteredProducts;

  const displayedProducts = sortedProducts.slice(0, 20);

  return (
    <section className={classNames(styles.section, 'container')}>
      <div className="flex">
        <h3 className={styles.section_title}>{title}</h3>
        <button disabled />
        <button />
      </div>

      <ul className={styles.section_list}>
        {displayedProducts.map(product => (
          <li className={styles.section_item} key={product.id}>
            <img
              src={product.image}
              alt="phone"
              className={styles.section_img}
            />
            <p className={styles.section_name}>{product.name}</p>
            <p className={styles.section_price}>${product.price}</p>
            <p>
              <span>Screen</span> {product.screen}
            </p>
            <p>
              <span>Capacity</span> {product.capacity}
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
