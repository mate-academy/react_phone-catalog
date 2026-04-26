import { NavLink } from 'react-router-dom';
import { ProductPreview } from '../../types';
import styles from './ProductCard.module.scss';
import heart from '../../images/Icons/Heart.svg';
import likedHeart from '../../images/Icons/HeartLike.svg';
import { useContext } from 'react';
import classNames from 'classnames';
import { CartContext } from '../../contexts/cart';
import { useCart } from '../../hooks/useCart';
import { FavContext } from '../../contexts/favorites';
import { useFav } from '../../hooks/useFav';

type Props = {
  product: ProductPreview;
};

export const ProductCard: React.FC<Props> = ({ product }) => {
  const { cartItems } = useContext(CartContext);
  const { favorites } = useContext(FavContext);

  const { addToCart, removeFromCart } = useCart();
  const { addToFav, removeFromFav } = useFav();

  const isAddedToCart = cartItems.some(
    cartItem => product.id === cartItem.product.id,
  );

  const isAddedToFav = favorites.some(favItem => product.id === favItem.id);

  const isOnSale = product.fullPrice !== product.price;

  return (
    <div className={styles.productCard}>
      <NavLink
        className={styles.productCard__imgLink}
        to={`/${product.category}/${product.itemId}`}
      >
        <img
          src={product.image}
          className={styles.productCard__img}
          alt="ProductImg"
        />
      </NavLink>

      <NavLink
        to={`/${product.category}/${product.itemId}`}
        className={styles.productCard__modelName}
      >
        {product.name}
      </NavLink>

      <div className={styles.productCard__price}>
        <h3 className={styles.productCard__newPrice}>
          {'$'}
          {isOnSale ? product.price : product.fullPrice}
        </h3>
        <h3 className={styles.productCard__oldPrice}>
          {'$'}
          {isOnSale ? product.fullPrice : ''}
        </h3>
      </div>

      <div className={styles.productCard__line}></div>

      <dl className={styles.productCard__specs}>
        <div className={styles.productCard__specsRow}>
          <dt className={styles.productCard__specsLabel}>Screen</dt>
          <dd className={styles.productCard__specsValue}>{product.screen}</dd>
        </div>

        <div className={styles.productCard__specsRow}>
          <dt className={styles.productCard__specsLabel}>Capacity</dt>
          <dd className={styles.productCard__specsValue}>{product.capacity}</dd>
        </div>

        <div className={styles.productCard__specsRow}>
          <dt className={styles.productCard__specsLabel}>RAM</dt>
          <dd className={styles.productCard__specsValue}>{product.ram}</dd>
        </div>
      </dl>

      <div className={styles.productCard__buttons}>
        <button
          className={classNames(styles.productCard__addBtn, {
            [styles.productCard__addBtnAdded]: isAddedToCart,
          })}
          onClick={() =>
            !isAddedToCart ? addToCart(product) : removeFromCart(product)
          }
        >
          {isAddedToCart ? 'Added' : 'Add to cart'}
        </button>
        <button
          className={classNames(styles.productCard__favBtn, {
            [styles.productCard__favBtnAdded]: isAddedToFav,
          })}
          onClick={() =>
            !isAddedToFav ? addToFav(product) : removeFromFav(product)
          }
        >
          <img src={!isAddedToFav ? heart : likedHeart} />
        </button>
      </div>
    </div>
  );
};
