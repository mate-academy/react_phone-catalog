import { Link } from 'react-router-dom';
import { CrossSVG } from '../../../shared/components/SVGs/CrossSVG';
import {
  accessoriesPath,
  phonesPath,
  tabletsPath,
} from '../../../shared/consts/paths';
import { Category } from '../../../shared/types/enums';
import { ProductInCart } from '../../../shared/types/types';
import styles from './CartItem.module.scss';
import { QuantitySelector } from '../QuantitySelector';
import React from 'react';
import { useCart } from '../../../shared/components/Contexts/CartContext';
// eslint-disable-next-line max-len
import { useLanguage } from '../../../shared/components/Contexts/LanguageContext';

type Props = {
  productInCart: ProductInCart;
};

export const CartItem: React.FC<Props> = ({ productInCart }) => {
  const { handleProductRemove } = useCart();
  const { id, product } = productInCart;
  const { accessRemoveFromCart } = useLanguage().localeTexts;

  const handleRemoveButtonClick = () => {
    handleProductRemove(id);
  };

  let path: string;

  switch (product.category) {
    case Category.Phones:
      path = phonesPath;
      break;
    case Category.Tablets:
      path = tabletsPath;
      break;
    case Category.Accessories:
      path = accessoriesPath;
      break;
    default:
      throw new Error('Product category is not valid!!!');
  }

  path += '/' + product.itemId;

  return (
    <li className={styles.CartItem}>
      <div className={styles.FirstMobileRow}>
        <button
          type="button"
          onClick={handleRemoveButtonClick}
          className={styles.RemoveButton}
        >
          <CrossSVG className={styles.Cross} />

          <span className={styles.RemoveButtonLabel}>
            {accessRemoveFromCart}
          </span>
        </button>

        <Link to={path} aria-label={product.name} className={styles.ImageLink}>
          <img
            src={product.image}
            alt={product.name}
            className={styles.Image}
          />
        </Link>

        <Link to={path} className={styles.TitleLink}>
          {product.name}
        </Link>
      </div>

      <div className={styles.SecondMobileRow}>
        <QuantitySelector productInCart={productInCart} />
        <strong className={styles.Price}>{`$${product.price}`}</strong>
      </div>
    </li>
  );
};
