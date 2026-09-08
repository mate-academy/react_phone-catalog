import './ProductCard.scss';
import { Product } from '../../../../types/Product';
import { NavLink } from 'react-router-dom';
import FavoriteIcon from './../../../../img/favorites-icon.png';
import FavoriteFilledIcon from './../../../../img/favorite-filled-icon.png';
import { useCart } from '../../../CartPage/components/CartContext/CartContext';
// eslint-disable-next-line max-len
import { useFavorites } from '../../../FavoritesPage/FavoritesContext/FavoritesContext';

type Props = {
  product: Product;
};

export const ProductCard: React.FC<Props> = ({ product }) => {
  const { cart, addToCart, removeCompletely } = useCart();
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();
  const itemInCart = cart.find(item => item.id === product.id);

  const handleClick = () => {
    if (itemInCart) {
      removeCompletely(product.id);
    } else {
      addToCart(product);
    }
  };

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();

    if (isFavorite(product.id)) {
      removeFavorite(product.id);
    } else {
      addFavorite(product);
    }
  };

  return (
    <article className="product" key={product.id}>
      <NavLink
        to={`/${product.category}/${product.itemId}`}
        className="product__link"
      >
        <div className="product__img">
          <img src={product.image} alt={product.name} />
        </div>
        <div className="product__name">{product.name}</div>
        <div className="product__prices">
          <div className="product__fullprice">${product.fullPrice}</div>
          <div className="product__price">${product.price}</div>
        </div>
        <div className="product__screen">
          <div className="product__screen-title">Screen</div>
          <div className="product__screen-spec">{product.screen}</div>
        </div>
        <div className="product__capacity">
          <div className="product__capacity-title">Capacity</div>
          <div className="product__capacity-spec">{product.capacity}</div>
        </div>
        <div className="product__ram">
          <div className="product__ram-title">Ram</div>
          <div className="product__ram-spec">{product.ram}</div>
        </div>
        <div className="product__buttons">
          <div
            className={`product__add ${itemInCart ? 'product__add-active' : ''}`}
            onClick={e => {
              e.preventDefault();
              handleClick();
            }}
          >
            {itemInCart ? 'Added' : 'Add to cart'}
          </div>
          <div
            className={`product__favorite ${isFavorite(product.id) ? 'product__favorite-filled' : ''}`}
            onClick={e => handleFavoriteClick(e)}
          >
            {isFavorite(product.id) ? (
              <img src={FavoriteFilledIcon} alt="heart-icon" />
            ) : (
              <img src={FavoriteIcon} alt="heart-icon" />
            )}
          </div>
        </div>
      </NavLink>
    </article>
  );
};
