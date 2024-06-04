import { FC } from 'react';
import { Link } from 'react-router-dom';

import styles from './ProductCard.module.css';
import { Product } from '../../../../types/Product';
import { ROUTES } from '../../../../constants/ROUTES';

interface Props {
  product: Product;
  isBrandNew?: boolean;
  onAddToCart: (product: Product) => void;
  onAddToFavourites: (product: Product) => void;
}

const ProductCard: FC<Props> = ({
  product,
  isBrandNew = false,
  onAddToCart,
  onAddToFavourites,
}) => {
  // const [isAddedToCart, setIsAddedToCart] = useState(false);
  // const [isAddedToFavourite, setIsAddedToFavourite] = useState(false);

  const { image, name, price, fullPrice, screen, capacity, ram, itemId } =
    product;

  return (
    <article className={styles.wrapper}>
      <div className={styles.header}>
        <Link to={`${ROUTES.PRODUCT}/${itemId}`} className={styles.imgWrapper}>
          <img src={`/${image}`} alt={name} className={styles.image} />
        </Link>
        <Link to={`${ROUTES.PRODUCT}/${itemId}`} className={styles.descr}>
          {name}
        </Link>
        <p className={styles.prices}>
          <span className={styles.newPrice}>${price}</span>
          {!isBrandNew && <span className={styles.oldPrice}>${fullPrice}</span>}
        </p>
      </div>

      <ul className={styles.paramsList}>
        <li className={styles.paramItem}>
          <span className={styles.paramType}>Screen</span>
          <span className={styles.paramValue}>{screen}</span>
        </li>
        <li className={styles.paramItem}>
          <span className={styles.paramType}>Capacity</span>
          <span className={styles.paramValue}>{capacity}</span>
        </li>
        <li className={styles.paramItem}>
          <span className={styles.paramType}>RAM</span>
          <span className={styles.paramValue}>{ram}</span>
        </li>
      </ul>

      <div className={styles.actionsWrapper}>
        <button
          type="button"
          className={`${styles.addBtn} ${styles.addBtnSelected}`}
          onClick={() => onAddToCart(product)}
        >
          {/* {isAddedToCart ? 'Added' : 'Add to cart'} */}
        </button>
        <button
          type="button"
          className={styles.favouriteBtn}
          aria-label="Add to favourites"
          onClick={() => onAddToFavourites(product)}
        ></button>
      </div>
    </article>
  );
};

export default ProductCard;
