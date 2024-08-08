import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Categories.module.scss';
import { Products } from '../../type/Products';
import { GridContainer } from '../GridContainer';

type Props = {
  products: Products[];
};

export const Categories: React.FC<Props> = ({ products }) => {
  const phoneItems = (serchParam: string) => {
    const items = products.filter(item => item.category === serchParam);

    return items.length;
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Shop by category</h2>
      <div className={styles.containerCard}>
        <GridContainer>
          <div className={styles.grid1}>
            <Link to="/phones">
              <div className={styles.phone}>
                <img src="img/category-phones.webp" alt="#" />
              </div>
            </Link>
            <div className={styles.description}>
              <h2>Mobile phones</h2>
              <p>{`${phoneItems('phones')} models`}</p>
            </div>
          </div>
          <div className={styles.grid2}>
            <Link to="/tables">
              <div className={styles.tablet}>
                <img src="img/category-tablets.png" alt="#" />
              </div>
            </Link>
            <div className={styles.description}>
              <h2>Tablets</h2>
              <p>{`${phoneItems('tablets')} models`}</p>
            </div>
          </div>
          <div className={styles.grid3}>
            <Link to="/smart">
              <div className={styles.accessories}>
                <img src="img/category-accessories.png" alt="#" />
              </div>
            </Link>
            <div className={styles.description}>
              <h2>Accessories</h2>
              <p>{`${phoneItems('accessories')} models`}</p>
            </div>
          </div>
        </GridContainer>
      </div>
    </div>
  );
};
