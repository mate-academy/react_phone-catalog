import { Link } from 'react-router-dom';
import { ProductType } from '../../types/ProductType';
import { AddToCart } from '../AddToCart';
import { AddToFav } from '../AddToFav';

type Props = {
  className?: string;
  product: ProductType;
  showDiscount?: boolean;
};

export const Product: React.FC<Props> = ({
  className = '',
  product,
  showDiscount = true,
}) => {
  const hasDiscount = showDiscount && product.price < product.fullPrice;

  return (
    <article className={`product ${className}`.trim()}>
      <Link
        className="product__img-link"
        to={`/${product.category}/${product.id}`}
      >
        <img className="product__img" src={product.image} alt={product.name} />
      </Link>
      <Link
        className="product__title"
        to={`/${product.category}/${product.id}`}
      >
        {product.name}
      </Link>
      <div className="product__prices">
        <span className="product__price">{`$${product.price}`}</span>
        {hasDiscount && (
          <span className="product__price product__price--full">{`$${product.fullPrice}`}</span>
        )}
      </div>

      <ul className="product__info-list">
        <li className="product__info-item">
          Screen
          <span className="product__info-value">{product.screen}</span>
        </li>
        <li className="product__info-item">
          Capacity
          <span className="product__info-value">{product.capacity}</span>
        </li>
        <li className="product__info-item">
          RAM
          <span className="product__info-value">{product.ram}</span>
        </li>
      </ul>

      <div className="product__buttons">
        <AddToCart product={product} />
        <AddToFav product={product} />
      </div>
    </article>
  );
};
