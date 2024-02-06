/* eslint-disable max-len */
/* eslint-disable jsx-a11y/control-has-associated-label */
import { Link } from 'react-router-dom';
import './product-card.scss';
import { Product } from '../../types/Product';
import { ProductDetail } from '../ProductDetail';
import { ProductCardActions } from '../ProductCardActions';

type Props = {
  product: Product,
};

export const ProductCard:React.FC<Props> = ({ product }) => {
  const {
    itemId,
    fullPrice,
    price,
    screen,
    capacity,
    ram,
    image,
  } = product;

  return (
    <div className="product-card">
      <Link to={`/phones/${itemId}`}>
        <img src={`./${image}`} alt={product.name} className="product__image" />
        <p className="product__title">
          {product.name}
        </p>
        <div className="product__prices">
          <p className="new-price">
            $
            {' '}
            {price}
          </p>
          <p className="old-price">
            $
            {' '}
            {fullPrice}
          </p>
        </div>
        <div className="product__details">
          <ProductDetail title="Screen" value={screen} />
          <ProductDetail title="Capacity" value={capacity} />
          <ProductDetail title="RAM" value={ram} />
        </div>
      </Link>
      <div className="product__actions">
        <ProductCardActions product={product} />
      </div>
    </div>
  );
};
