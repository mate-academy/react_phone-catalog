import { Product } from '../../../../types/ProductCard';
import './ProductCard.scss';

type Props = {
  product: Product;
  hasDiscount?: boolean;
};

export const ProductCard: React.FC<Props> = ({
  product,
  hasDiscount = false,
}) => {
  const { name, price, screen, capacity, ram } = product;

  const image =
    'images' in product && Array.isArray(product.images)
      ? product.images[0]
      : product.image;

  const wishlistIconPath = './icons/heart-black.svg';

  return (
    <article className="product">
      <img src={image} className="product__image" alt="Image of the product" />
      <h3 className="product__name">{name}</h3>
      <div className="product__price-wrapper">
        <p className="product__price">${price}</p>
        {hasDiscount && (
          <p className="product__price product__price--old">
            ${product.fullPrice}
          </p>
        )}
      </div>

      <hr className="product__divider" />

      <div className="details product__details">
        <div className="detail details__detail">
          <p className="detail__title">Screen</p>
          <p className="detail__info">{screen}</p>
        </div>
        <div className="detail details__detail">
          <p className="detail__title">Capacity</p>
          <p className="detail__info">{capacity}</p>
        </div>
        <div className="detail details__detail">
          <p className="detail__title">RAM</p>
          <p className="detail__info">{ram}</p>
        </div>
      </div>

      <div className="buttons">
        <button className="buttons__cart">Add to cart</button>
        <button className="wishlist-button buttons__wishlist">
          <img
            className="wishlist-button__icon"
            src={wishlistIconPath}
            alt="Heart icon image, adds the product to wishlist when clicked"
          />
        </button>
      </div>
    </article>
  );
};
