import { Link } from 'react-router-dom';
import { ProductPage } from '../../types/ProductPage';
import './CardItem.scss';
import { useFavorites } from '../../context/Favorites/FavoritesContext';
import { useCart } from '../../context/Cart/CartContext';
import classNames from 'classnames';

export const CardItem = ({
  cardItem,
  isFullPrice,
}: {
  cardItem: ProductPage;
  isFullPrice: boolean;
}) => {
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites();
  const { addToCart, isCart, removeFromCart } = useCart();

  return (
    <>
      <div className="card">
        <div className="card-content-wrapper">
          <Link
            to={`/${cardItem.category}/${cardItem.itemId}`}
            className="card-img-link"
            onClick={() => {
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            <img src={`${cardItem.image}`} alt="" className="card-img" />
          </Link>
          <div className="card-middle">
            <h6 className="card-name">
              <Link
                to={`/${cardItem.category}/${cardItem.itemId || cardItem.id}`}
              >
                {cardItem.name}
              </Link>
            </h6>
            <span className="card-price">
              ${cardItem.price}
              {isFullPrice ? (
                <span className="card-full-price">${cardItem.fullPrice}</span>
              ) : (
                ''
              )}
            </span>
          </div>
          <div className="card-props">
            <p className="card-props-line">
              <span className="card-props-line-title">Screen</span>
              <span>{cardItem.screen}</span>
            </p>

            <p className="card-props-line">
              <span className="card-props-line-title">Capacity</span>
              <span>{cardItem.capacity}</span>
            </p>

            <p className="card-props-line">
              <span className="card-props-line-title">RAM</span>
              <span>{cardItem.ram}</span>
            </p>
          </div>
          <footer className="card-footer">
            <button
              className={classNames('card-add', {
                'cart-added': isCart(cardItem.id),
              })}
              onClick={() => {
                if (!isCart(cardItem.id)) {
                  addToCart(cardItem);
                } else {
                  removeFromCart(cardItem.id);
                }
              }}
            >
              {isCart(cardItem.id) ? 'Added to cart' : 'Add to cart'}
            </button>
            <button
              className={classNames('card-add-fav', {
                'card-add-fav-added': isFavorite(cardItem.id),
              })}
              onClick={() => {
                if (isFavorite(cardItem.id)) {
                  removeFromFavorites(cardItem.id);
                } else {
                  addToFavorites(cardItem);
                }
              }}
            >
              {isFavorite(cardItem.id) ? (
                <img src="img/home/card/fav-hover.svg" alt="" />
              ) : (
                <img src="img/home/card/fav.svg" alt="" />
              )}
            </button>
          </footer>
        </div>
      </div>
    </>
  );
};
