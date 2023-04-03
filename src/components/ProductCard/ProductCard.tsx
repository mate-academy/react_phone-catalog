import classNames from 'classnames';
import { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { createCartItem, getCorrectLink } from '../../helpers/calc/helper';
import { Product } from '../../types/Product';
import { CartContext } from '../contexts/CartContextProvider';
import { FavContext } from '../contexts/FavContextProvider';
import './style.scss';

type ProductCardProps = {
  product: Product;
};

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
}) => {
  const { pathname } = useLocation();
  const {
    cart,
    addToCart,
    removeFromCart,
  } = useContext(CartContext);

  const {
    favItems,
    addToFav,
    removeFromFav,
  } = useContext(FavContext);

  const {
    id,
    name,
    price,
    screen,
    capacity,
    ram,
    image,
    fullPrice,
    phoneId,
    category,
  }
    = product;

  const isInCart = cart?.find(item => item.product.id === id);
  const isInFav = favItems?.find(item => item.id === id);

  const handleToggleToCart = () => {
    if (isInCart && removeFromCart) {
      removeFromCart(id);
    } else {
      const createdCartItem = createCartItem(product);

      if (addToCart) {
        addToCart(createdCartItem);
      }
    }
  };

  const handleToggleToFav = () => {
    if (isInFav && removeFromFav) {
      removeFromFav(id);
    } else if (addToFav) {
      addToFav(product);
    }
  };

  const correctLink = getCorrectLink(category, phoneId, pathname);

  return (
    <div className="product-card" data-cy="cardsContainer">
      <Link className="product-card__link" to={correctLink}>
        <img className="product-card__img" src={image} alt={name} />
        <p className="product-card__title">{name}</p>
        <div className="product-card__prices">
          <p className="product-card__price">{`$${fullPrice}`}</p>
          <p className="product-card__discount">
            {`$${price}`}
          </p>
        </div>
      </Link>

      <div className="product-card__tech">
        <div className="product-card__pair">
          <p className="product-card__pair-prop">Screen</p>
          <p className="product-card__pair-value">{screen}</p>
        </div>

        <div className="product-card__pair">
          <p className="product-card__pair-prop">Capacity</p>
          <p className="product-card__pair-value">{capacity}</p>
        </div>

        <div className="product-card__pair">
          <p className="product-card__pair-prop">RAM</p>
          <p className="product-card__pair-value">{ram}</p>
        </div>
      </div>

      <div className="product-card__actions">
        <button
          type="button"
          className={classNames(
            'button',
            'button--primary',
            'product-card__cart', {
              'button--selected': isInCart,
            },
          )}
          onClick={handleToggleToCart}
        >
          {isInCart ? 'Added to cart' : 'Add to cart'}
        </button>
        <button
          type="button"
          onClick={handleToggleToFav}
          className="product-card__fav icon__btn"
        >
          <i className={classNames('icon', 'icon--fav', {
            'icon--fav-active': isInFav,
          })}
          />
        </button>
      </div>
    </div>
  );
};
