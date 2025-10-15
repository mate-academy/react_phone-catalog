import React from 'react';
import styles from './NavigateButton.module.scss';
import { NavLink, useParams } from 'react-router-dom';
import { Product } from '../../../../ProductsContext/TabsContext';

interface NavigateButtonProps {
  product?: Product;
}
export const NavigateButton: React.FC<NavigateButtonProps> = ({ product }) => {
  const { category } = useParams();

  const getCategoryName = (categoryName?: string) => {
    switch (categoryName) {
      case 'tablets':
        return 'Tablets';

      case 'phones':
        return 'Phones';

      case 'accessories':
        return 'Accessories';

      default:
        return '';
    }
  };

  return (
    <div className={styles.navigate}>
      <NavLink to="/" className={styles.button}>
        <img src="/img/SliderImg/Home.svg" alt="Home" />
      </NavLink>
      <img src="img/SliderImg/Arrow Right.svg" alt="ArrowRight" />
      {!product ? (
        <span>{getCategoryName(category)}</span>
      ) : (
        <div className={styles.category}>
          <NavLink to={`/${product.category}`} className={styles.button}>
            {getCategoryName(product.category)}
          </NavLink>
          <img src="img/SliderImg/Arrow Right.svg" alt="ArrowRight" />
          <div>{product.name}</div>
        </div>
      )}
    </div>
  );
};
