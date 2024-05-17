import classNames from 'classnames';
import { Product } from '../../../types/Product';
import styles from './ProductCard.module.scss';
import { Link } from 'react-router-dom';
// eslint-disable-next-line max-len
import { AddToFavoriteButton } from '../AddToFavoriteButton/AddToFavoriteButton';
import { useContext } from 'react';
import { AppContext } from '../../../utils/AppContext';

type Props = {
  product: Product;
  isDiscountVisible: boolean;
};

export const ProductCard: React.FC<Props> = ({
  product,
  isDiscountVisible,
}) => {
  const { name, fullPrice, price, screen, capacity, ram, image, itemId } =
    product;

  const { isDarkTheme, inCartItems, setInCartItems } = useContext(AppContext);

  const isInCart = inCartItems.includes(name);

  const addToCart = () => {
    if (isInCart) {
      return;
    }

    setInCartItems([...inCartItems, name]);
  };

  return (
    <article
      className={classNames(styles.card, isDarkTheme ? styles.cardDark : '')}
    >
      <div className={styles.card__imgContainer}>
        <Link to={`/product/${itemId}`} className={styles.imgLink}>
          <img
            className={styles.cardImage}
            alt="Product Image"
            src={image}
            onClick={() => window.scrollTo(0, 0)}
          />
        </Link>
      </div>

      <Link to={`/product/${itemId}`} className={classNames(styles.card__link)}>
        <span
          className={classNames(
            styles.cardTitle,
            isDarkTheme ? styles.cardTitleDark : '',
          )}
        >
          {name}
        </span>
      </Link>

      <div className={styles.cardPrices}>
        <div
          className={classNames(
            styles.newPrice,
            isDarkTheme ? styles.newPriceDark : '',
          )}
        >
          {price}$
        </div>
        {isDiscountVisible && (
          <div
            className={classNames(
              styles.oldPrice,
              isDarkTheme ? styles.oldPriceDark : '',
            )}
          >
            {fullPrice}$
          </div>
        )}
      </div>

      <div
        className={classNames(
          styles.cardLine,
          isDarkTheme ? styles.cardLineDark : '',
        )}
      ></div>

      <div className={styles.cardInfoBlock}>
        <div className={styles.cardInfoLine}>
          <span
            className={classNames(
              styles.infoLineTitle,
              isDarkTheme ? styles.infoLineTitleDark : '',
            )}
          >
            Screen
          </span>
          <span
            className={classNames(
              styles.infoLineText,
              isDarkTheme ? styles.infoLineTextDark : '',
            )}
          >
            {screen}
          </span>
        </div>
        <div className={styles.cardInfoLine}>
          <span
            className={classNames(
              styles.infoLineTitle,
              isDarkTheme ? styles.infoLineTitleDark : '',
            )}
          >
            Capacity
          </span>
          <span
            className={classNames(
              styles.infoLineText,
              isDarkTheme ? styles.infoLineTextDark : '',
            )}
          >
            {capacity}
          </span>
        </div>
        <div className={styles.cardInfoLine}>
          <span
            className={classNames(
              styles.infoLineTitle,
              isDarkTheme ? styles.infoLineTitleDark : '',
            )}
          >
            RAM
          </span>
          <span
            className={classNames(
              styles.infoLineText,
              isDarkTheme ? styles.infoLineTextDark : '',
            )}
          >
            {ram}
          </span>
        </div>
      </div>

      <div className={styles.cardButtons}>
        <div
          className={classNames(
            styles.addButton,
            isInCart ? styles.isInCart : '',
            isDarkTheme ? styles.addButtonDark : '',
            isInCart && isDarkTheme ? styles.isInCartDark : '',
          )}
          onClick={addToCart}
        >
          <span>{isInCart ? 'Added to cart' : 'Add to cart'}</span>
        </div>

        <AddToFavoriteButton product={product} />
      </div>
    </article>
  );
};
