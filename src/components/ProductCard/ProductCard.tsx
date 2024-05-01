import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { Product } from '../../types/Product';
import './ProductCard.scss';
import { GlobalContext } from '../Context/Context';

type Props = {
  product: Product;
};

export const ProductCard: React.FC<Props> = ({ product }) => {
  const { cartProducts, favorites, addToCart, addToFavorites } =
    useContext(GlobalContext);

  return (
    <div className="card">
      <div className="card__content">
        <Link
          className="card__link"
          to={`/${product.category}/${product.itemId}`}
        >
          <img className="card__photo" alt="product" src={product.image} />
          <div className="card__model">{product.name}</div>

          <div className="card__prices">
            <div className="card__discount">{`$${product.price}`}</div>
            <div className="card__full-price">{`$${product.fullPrice}`}</div>
          </div>

          <div className="card__description">
            <div className="card__info">
              <div className="card__category">Screen</div>
              <div className="card__value">{product.screen}</div>
            </div>
            <div className="card__info">
              <div className="card__category">Capacity</div>
              <div className="card__value">{product.capacity}</div>
            </div>
            <div className="card__info">
              <div className="card__category">RAM</div>
              <div className="card__value">{product.ram}</div>
            </div>
          </div>
        </Link>
        <div className="card__buttons">
          <button
            type="button"
            onClick={() => addToCart(product)}
            className={
              cartProducts.some(item => item.id === product.id)
                ? 'card__add-button-active'
                : 'card__add-button'
            }
          >
            {cartProducts.some(item => item.id === product.id)
              ? 'Added to cart'
              : 'Add to cart'}
          </button>
          <button
            onClick={() => addToFavorites(product)}
            type="button"
            aria-label="favourites"
            className={`card__favourites ${
              favorites.some(item => item.id === product.id)
                ? 'icon--favourites-active'
                : 'icon--favourites'
            }`}
          />
        </div>
      </div>
    </div>
  );
};
