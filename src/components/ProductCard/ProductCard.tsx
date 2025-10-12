import { Link } from 'react-router-dom';
import { useFavourites } from '../../contexts/Favourites';
import { CatalogItem } from '../../types/CatalogItem';
import './ProductCard.scss';
import { useCart } from '../../contexts/Cart';

interface Props {
  product: CatalogItem;
  showDiscount?: boolean;
}

export const ProductCard: React.FC<Props> = ({ product, showDiscount = false }) => {
  const { isFavourite, toggleFavourite } = useFavourites();
  const { isInCart, toggleCart } = useCart();

  return (
    <div className="product-card">
      <Link to={`/product/${product.id}`} className="product-card__image">
        <img className="product-card__image__link" src={product.images[0]} alt={product.name} />
      </Link>

      <Link to={`/product/${product.id}`} className="product-card__title">
        <p>{product.name}</p>
      </Link>

      <div className="product-card__price">
        {showDiscount ? (
          <>
            <span className="product-card__price--regular">${product.priceDiscount}</span>
            <span className="product-card__price--discount">${product.priceRegular}</span>
          </>
        ) : (
          <span className="product-card__price--regular">${product.priceRegular}</span>
        )}
      </div>

      <div className="product-card__specs">
        <div className="product-card__spec">
          <p className="product-card__label">Screen</p>
          <p className="product-card__value">{product.screen}</p>
        </div>

        <div className="product-card__spec">
          <p className="product-card__label">Capacity</p>
          <p className="product-card__value">{product.capacity}</p>
        </div>

        <div className="product-card__spec">
          <p className="product-card__label">RAM</p>
          <p className="product-card__value">{product.ram}</p>
        </div>
      </div>

      <div className="product-card__actions">
        <button
          className={
            isInCart(product.id)
              ? 'product-card__button product-card__button--add product-card__button--add--active'
              : 'product-card__button product-card__button--add'
          }
          onClick={() => toggleCart(product.id)}
        >
          {isInCart(product.id) ? 'Added to cart' : 'Add to cart'}
        </button>
        <button
          className="product-card__button product-card__button--like"
          onClick={() => toggleFavourite(product.id)}
        >
          <img
            src={isFavourite(product.id) ? './img/like-active.svg' : './img/like.svg'}
            alt="Add to favorites"
            className="product-card__button--like--link"
          />
        </button>
      </div>
    </div>
  );
};
