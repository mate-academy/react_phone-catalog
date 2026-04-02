import { assetUrl } from '../../../utils/url';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../store';
import { addToCart } from '../../../store/cartSlice';
import { toggleFavourite } from '../../../store/favouritesSlice';
import type { Product } from '../../../types';
import './ProductCard.scss';

interface Props {
  product: Product;
}

export const ProductCard = ({ product }: Props) => {
  const dispatch = useAppDispatch();

  const inCart = useAppSelector((state) =>
    state.cart.items.some((item) => item.product.itemId === product.itemId),
  );

  const isFavourite = useAppSelector((state) =>
    state.favourites.items.some((item) => item.itemId === product.itemId),
  );

  const handleAddToCart = () => {
    if (!inCart) {
      dispatch(addToCart(product));
    }
  };

  const handleToggleFavourite = () => {
    dispatch(toggleFavourite(product));
  };

  return (
    <div className="card">
      <div className="card__content">
        <Link
          className="card__link"
          to={`/${product.category}/${product.itemId}`}
        >
          <img className="card__image" src={product.image} alt={product.name} />
          <span className="card__title">{product.name}</span>
        </Link>

        <div className="card__price">
          <span className="card__price-current">${product.price}</span>
          {product.fullPrice !== product.price && (
            <span className="card__price-full">${product.fullPrice}</span>
          )}
        </div>

        <div className="card__divider" />

        <div className="card__spec">
          <span className="card__spec-name">Screen</span>
          <span className="card__spec-value">{product.screen}</span>
        </div>

        <div className="card__spec">
          <span className="card__spec-name">Capacity</span>
          <span className="card__spec-value">{product.capacity}</span>
        </div>

        <div className="card__spec">
          <span className="card__spec-name">RAM</span>
          <span className="card__spec-value">{product.ram}</span>
        </div>

        <div className="card__buttons">
          <button
            className={`card__button-cart${inCart ? ' card__button-cart--added' : ''}`}
            onClick={handleAddToCart}
          >
            {inCart ? 'Added to cart' : 'Add to cart'}
          </button>

          <button
            className={`card__button-like${isFavourite ? ' card__button-like--active' : ''}`}
            onClick={handleToggleFavourite}
            aria-label={isFavourite ? 'Remove from favourites' : 'Add to favourites'}
          >
            <img
              className="card__button-like-icon"
              src={isFavourite ? assetUrl(assetUrl('/icons/icon--favourites-filled.svg')) : assetUrl(assetUrl('/icons/icon--favourites.svg'))}
              alt=""
            />
          </button>
        </div>
      </div>
    </div>
  );
};
