import { Link } from 'react-router-dom';
import './ProductCard.scss';
import { useCart } from '../../context/CartContext';
import { useFavourites } from '../../context/FavoritesContext';
import { ProductBase } from '../../types/ProductBase';

interface Props {
  product: ProductBase;
  isDiscounted?: boolean;
}

export const ProductCard: React.FC<Props> = ({
  product,
  isDiscounted = false,
}) => {
  const { addToCart, isInCart, removeFromCart } = useCart();
  const { toggle, isFavourite } = useFavourites();

  const cartKey = product.favouriteKey;


  const cartProduct = {
    id: String(product.id),
    name: product.name,
    price: product.price,
    priceDiscount:
      product.fullPrice > product.price ? product.price : undefined,
    images: [product.image],
    category: product.category,
    capacity: product.capacity,
    color: product.color,
  };
  const favouriteKey = `${product.id}-${product.capacity ?? 'base'}-${product.color ?? 'base'}`;

  const productWithKey: ProductBase = {
    ...product,
    favouriteKey,
  };
  return (

      <div className="card">
        <Link
          to={`/${product.category}/${product.itemId}`}
          className="card__link-wrapper"
        >
          <div className="card__image-wrapper">
          <img
            src={`${product.image}`}
            alt={product.name}
            className="card__image"
          />
          </div>
          <h3 className="card__name">{product.name}</h3>
        </Link>

        <div className="card__price">
          <span className="card__price-new">${product.price}</span>

          {isDiscounted && product.fullPrice > product.price && (
            <span className="card__price-old">${product.fullPrice}</span>
          )}
        </div>

        <div className="card__chars">
          <div className="card__char-item">
            <span className="card__char-name">Screen</span>
            <span className="card__char-value">{product.screen}</span>
          </div>

          <div className="card__char-item">
            <span className="card__char-name">Capacity</span>
            <span className="card__char-value">{product.capacity}</span>
          </div>

          <div className="card__char-item">
            <span className="card__char-name">RAM</span>
            <span className="card__char-value">{product.ram}</span>
          </div>
        </div>

        <div className="card__actions" onClick={e => e.stopPropagation()}>
          <button
            className={`card__add-to-cart-button ${isInCart(cartKey) ? "added" : ""}`}
            onClick={(e) => {
              e.stopPropagation();

              if (isInCart(cartKey)) {
                removeFromCart(cartKey);
              } else {
                addToCart(cartProduct);
              }
            }}
          >
            {isInCart(cartKey) ? "Added to cart" : "Add to cart"}
          </button>


          <button
            className={`card__favourites-button ${isFavourite(favouriteKey) ? 'is-active' : ''
              }`}
            onClick={e => {
              e.stopPropagation();
              toggle(productWithKey);
            }}
          >
            <span className="icon icon--favourite">
              <img
                src={
                  isFavourite(favouriteKey)
                    ? 'img/favourite_checked.png'
                    : 'img/favourite_default.png'
                }
                alt="Favourite"
                className="icon__img"
              />
            </span>
          </button>

        </div>
      </div>

  );
};
