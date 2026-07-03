import styles from './ProductCard.module.scss';
// import { asset } from '../../utils/paths';
import { NavLink } from 'react-router-dom';

import { ProductCardItem } from '../../types/ProductCardItem';
import { CardButton } from './CardButton/CardButton';
import { useFavorites } from '../../context/FavoritesContext';
import { useCart } from '../../context/CartContext';

type Props = ProductCardItem & {
  showDiscount?: boolean;
};

export const ProductCard: React.FC<Props> = ({
  id,
  category,
  name,
  price,
  discount,
  showDiscount,
  image,
  screen,
  capacity,
  ram,
}) => {
  const { isFavorite, toggleFavorite } = useFavorites();
  const { addToCart, removeFromCart, isInCart } = useCart();

  console.log('image:', image);
  // console.log('asset(image):', asset(image));

  return (
    <article className={styles.card}>
      <div className={styles.top}>
        <NavLink
          // to={`/products/${id}`}
          to={`/${category}/${id}`}
          className={`${styles.icon} ${styles.mobileAction}`}
        >
          <div className={styles.image}>
            {/* {image ? (
              <img src={asset(image)} alt={name} />
            ) : (
              <span>No image</span>
            )} */}

            {/* {image ? <img src={image} alt={name} /> : <span>No image</span>} */}
            {image ? (
              <img src={`./${image}`} alt={name} />
            ) : (
              <span>No image</span>
            )}
          </div>

          <h3 className={styles.title}>{name}</h3>
        </NavLink>
      </div>
      <div className={styles.info}>
        <div className={styles.wrapperPrice}>
          <p className={styles.price}>${price}</p>
          {showDiscount && discount > 0 && (
            <p className={styles.discount}>${discount}</p>
          )}
        </div>

        <ul className={styles.specs}>
          <li className={styles.spec}>
            <span>Screen</span>
            <span>{screen}</span>
          </li>

          <li className={styles.spec}>
            <span>Capacity</span>
            <span>{capacity}</span>
          </li>

          <li className={styles.spec}>
            <span>RAM</span>
            <span>{ram}</span>
          </li>
        </ul>
      </div>

      <CardButton
        isFavorite={isFavorite(id)}
        isInCart={isInCart(id)}
        onToggleFavorite={() => toggleFavorite(id)}
        onToggleCart={() => {
          if (isInCart(id)) {
            removeFromCart(id);
          } else {
            addToCart(id);
          }
        }}
      />
    </article>
  );
};
