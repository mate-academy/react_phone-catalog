import { Link } from 'react-router-dom';
import { Product } from '../../types/Product';
import './ProductCard.scss';

type Props = {
  product: Product,
};

export const ProductCard: React.FC<Props> = ({ product }) => {
  const productPath = `/${product.type}s/${product.id}`;

  return (
    <div className="ProductCard">
      <div className="ProductCard__image-container">
        <Link to={productPath}>
          <img
            className="ProductCard__image"
            src={product.imageUrl}
            alt={product.name}
          />
        </Link>
      </div>

      <div className="ProductCard__title">
        <Link to={productPath}>
          {product.name}
        </Link>
      </div>

      <div className="ProductCard__price">
        <h2 className="ProductCard__price-main">
          {`$${product.price}`}
        </h2>
      </div>
    </div>
  );
};
