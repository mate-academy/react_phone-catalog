import React from 'react';
import styles from './ProductsList.module.scss';
// import { AppContext } from '../../AppContext';
import { ProductCard } from '../ProductCard';
import { Product } from '../../typies';

// const filteredArr = (arr: Product[], query: string) => {
//   return [...arr].filter(item =>
//     item.name.trim().toLowerCase().includes(query.trim().toLowerCase()),
//   );
// };

type Props = {
  products: Product[] | null;
};

export const ProductsList: React.FC<Props> = ({ products }) => {
  // const { search } = React.useContext(AppContext);

  // const newArray = search
  //   ? products && filteredArr(products, search)
  //   : products;

  return (
    <ul className={styles.list}>
      {products?.map(productItem => (
        <li key={productItem.id} className={styles.item}>
          <ProductCard product={productItem} />
        </li>
      ))}
    </ul>
  );
};
