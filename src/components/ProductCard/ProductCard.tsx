import { Link } from 'react-router-dom';
import { Product } from '../../types/Product';
import './ProductCard.scss';
import { ProductButtons } from '../ProductButtons/ProductButtons';
import { API_URL } from '../../utils/api';

type Props = {
  product: Product;
};

export const ProductCard: React.FC<Props> = ({ product }) => {
  const {
    phoneId,
    name,
    price,
    fullPrice,
    screen,
    capacity,
    ram,
    image,
  } = product;

  return (
    <div className="product">
      <Link to={`/${product.category}/${phoneId}`}>
        <div className="product__image">
          <img
            src={`${API_URL}${image}`}
            alt={name}
            className="product__image--item"
          />
        </div>
        <p className="product__title">{name}</p>
        <div className="product__price">
          <div className="product__price-current">{`$${price}`}</div>
          <div className="product__price-fullPrice">{`$${fullPrice}`}</div>
        </div>
        <div className="product__properties">
          <div className="product__screen">
            <p className="product__screen-text">Screen</p>
            <p className="product__screen-value">{screen}</p>
          </div>
          <div className="product__capacity">
            <p className="product__capacity-text">Capacity</p>
            <p className="product__capacity-value">{capacity}</p>
          </div>
          <div className="product__ram">
            <p className="product__ram-text">RAM</p>
            <p className="product__ram-value">{ram}</p>
          </div>
        </div>
      </Link>

      <ProductButtons product={product} />
    </div>
  );
};
