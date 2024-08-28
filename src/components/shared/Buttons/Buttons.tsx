import styles from './Buttons.module.scss';
import classNames from 'classnames';
import { useContext } from 'react';
import { GlobalContext } from '../GlobalContext/GlobalContext';
import { Product } from '../../../type/Product';

type Props = {
  product: Product;
};

export const Buttons: React.FC<Props> = ({ product }) => {
  const {
    isSunSelected,
    handlerLikedCard,
    isLiked,
    handlerAddProduct,
    isGoods,
  } = useContext(GlobalContext);

  const isProductLiked = isLiked.some(
    likedProduct => likedProduct.id === product.id,
  );

  const isProductAdded = isGoods.some(
    addedProduct => addedProduct.id === product.id,
  );

  return (
    <div className={styles.buttons}>
      <button
        type="button"
        className={classNames(styles.buttons__add, {
          [styles.buttons__add_dark]: !isSunSelected,
          [styles.buttons__add_active]: isProductAdded,
          [styles.buttons__add_dark_active]: !isSunSelected && isProductAdded,
        })}
        onClick={() => handlerAddProduct(product.id)}
      >
        {!isProductAdded ? 'Add to cart' : 'Added to cart'}
      </button>

      <button
        type="button"
        className={classNames(styles.buttons__like, {
          [styles.buttons__like_dark]: !isSunSelected,
          [styles.buttons__like_active]: isProductLiked,
          [styles.buttons__like_dark_active]: isProductLiked && !isSunSelected,
        })}
        onClick={() => handlerLikedCard(product.id)}
      ></button>
    </div>
  );
};
