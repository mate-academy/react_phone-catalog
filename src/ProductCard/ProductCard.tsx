import { Link } from 'react-router-dom';
import './ProductCard.scss';
import { Product } from '../Types/products';
import { ButtonsAddToCardFavorites } from '../ButtonsAddToCardFavorites';
type Props = {
  product: Product;
};
export const ProductCard = ({ product }: Props) => {
  const { name, price, screen, capacity, ram, image } = product;

  return (
    <div className="product-card">
      <Link
        className="product-card__link"
        to={`/${product.category}/${product.itemId}`}
      >
        <img className="product-card__img" src={`/${image}`} alt="product" />
      </Link>

      <Link
        to={`/${product.category}/${product.itemId}`}
        className="product-card__title"
      >
        {name}
      </Link>

      <span className="product-card__price">{`$${price}`}</span>

      <div className="product-card__specs">
        <div className="product-card__spec">
          <span className="product-card__characteristic">Screen</span>
          <span className="product-card__value">
            {screen.replace(/\(.*?\)/g, '')}
          </span>
        </div>

        <div className="product-card__spec">
          <span className="product-card__characteristic">Capacity</span>
          <span className="product-card__value">{capacity}</span>
        </div>

        <div className="product-card__spec">
          <span className="product-card__characteristic">RAM</span>
          <span className="product-card__value">{ram}</span>
        </div>
      </div>

      <ButtonsAddToCardFavorites product={product} />
    </div>
  );
};
