import { Products } from '../../types/Product';
import s from './ProductCard.module.scss';
import icon from '../../assets/images/icons/Favourites (Heart Like).svg';
import heart from '../../assets/images/icons/Heart.svg';
import { Link } from 'react-router-dom';
import { useCart, useFavorites } from '../../hooks/ContextHook';
import classNames from 'classnames';

type Props = {
  product: Products;
};

export const ProductCard: React.FC<Props> = ({ product }) => {
  const { cartItems, toggleCart } = useCart();
  const { favorites, toggleFavorites } = useFavorites();

  const isInCart = cartItems.some((item) => item.product.itemId === product.itemId);
  const isFavorite = favorites.some((item) => item.product.itemId === product.itemId);

  return (
    <article className={s.container}>
      <Link className={s.nav} to={`/product/${product.itemId}`}>
        <div className={s.productImage}>
          <img className={s.image} src={product.image} alt={`${product.name} view`} />
        </div>

        <h3 className={s.productName}>{product.name}</h3>
      </Link>

      <div className={s.productPrice}>
        <span className={s.newPrice}>${product.price}</span>
        <span className={s.price}>${product.fullPrice}</span>
      </div>

      <div className={s.line} aria-hidden="true"></div>

      <div className={s.description}>
        <div className={s.descriptionItem}>
          <span className={s.label}>Screen</span>
          <span className={s.value}>{product.screen}</span>
        </div>
        <div className={s.descriptionItem}>
          <span className={s.label}>Capacity</span>
          <span className={s.value}>{product.capacity}</span>
        </div>
        <div className={s.descriptionItem}>
          <span className={s.label}>RAM</span>
          <span className={s.value}>{product.ram}</span>
        </div>
      </div>

      <div className={s.productButton}>
        <button
          type="button"
          className={classNames(s.selected, { [s.isInCart]: isInCart })}
          onClick={() => toggleCart(product)}
        >
          {!isInCart ? 'Add to cart' : 'Added'}
        </button>
        <button
          type="button"
          className={classNames(s.favorites, { [s.isFavorite]: isFavorite })}
          onClick={() => toggleFavorites(product)}
        >
          <img src={isFavorite ? heart : icon} alt="favorites" aria-label="Add to favorites" />
        </button>
      </div>
    </article>
  );
};
