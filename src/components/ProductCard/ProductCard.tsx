/* eslint-disable max-len */
/* eslint-disable jsx-a11y/control-has-associated-label */
import { Link } from 'react-router-dom';
import './product-card.scss';
import { Product } from '../../types/Product';

type Props = {
  product: Product,
};

export const ProductCard:React.FC<Props> = ({ product }) => {
  const {
    id,
    fullPrice,
    price,
    screen,
    capacity,
    ram,
    image,
  } = product;

  return (
    <Link className="product-card" to="/" key={id}>
      <img src={`./${image}`} alt={product.name} className="product__image" />
      <p className="product__title">
        {product.name}
        {' '}
        (iMT9G2FS/A)
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
        <div className="screen-size detail">
          <p className="detail__title">Screen</p>
          <p className="detail__value">
            {screen}
          </p>
        </div>
        <div className="capacity detail">
          <p className="detail__title">Capacity</p>
          <p className="detail__value">
            {capacity}
          </p>
        </div>
        <div className="memory detail">
          <p className="detail__title">RAM</p>
          <p className="detail__value">
            {ram}
          </p>
        </div>
      </div>
      <div className="product__actions">
        <button
          type="button"
          className="add-to-card primary__button button"
        >
          Add to cart
        </button>
        <button type="button" className="add-to-favourite button icon" />
      </div>
    </Link>
  );
};
