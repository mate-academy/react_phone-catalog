import React from 'react';
import styles from './NavigateButton.module.scss';
import { NavLink, useParams } from 'react-router-dom';
import { Product } from '../../../../ProductsContext/TabsContext';
import { useSafeProduct } from '../../hooks/SafeProduct';

interface NavigateButtonProps {
  productElement?: Product;
}

export const NavigateButton: React.FC<NavigateButtonProps> = ({
  productElement,
}) => {
  const { category } = useParams();
  const productFromContext = useSafeProduct();

  const product: Product | undefined =
    productFromContext?.product || productElement;

  const getCategoryName = (categoryName?: string) => {
    switch (categoryName) {
      case 'tablets':
        return 'Tablets';

      case 'phones':
        return 'Phones';

      case 'accessories':
        return 'Accessories';

      case 'favourites':
        return 'Favourites';

      default:
        return '';
    }
  };

  return (
    <div className={styles.navigate}>
      <NavLink to="/" className={styles.button}>
        <img src="./img/image/Icons/Home.svg" alt="Home" />
      </NavLink>
      <div className={styles.vectorRight}>
        <img src="./img/image/Icons/VectorRight.svg" alt="ArrowRight" />
      </div>
      {!product ? (
        <span>{getCategoryName(category)}</span>
      ) : (
        <div className={styles.category}>
          <NavLink to={`/${product.category}`} className={styles.button}>
            {getCategoryName(product.category)}
          </NavLink>
          <div className={styles.vectorRight}>
            <img src="./img/image/Icons/VectorRight.svg" alt="ArrowRight" />
          </div>
          <div>{product.name}</div>
        </div>
      )}
    </div>
  );
};
