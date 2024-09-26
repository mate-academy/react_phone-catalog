import { Link } from 'react-router-dom';
import { Product } from '../types/Product';
import './ProductCard.scss';

type Props = {
  product: Product;
};

export const ProductCard = ({ product }: Props) => {
  return (
    <div className="productcard">
      <Link
        to={`/${product.category}/${product.itemId}`}
        className="productcard__image--link"
      >
        <img
          className="productcard__image"
          src={product.image}
          alt={product.name}
        />
      </Link>

      <h2 className="productcard__name">{product.name}</h2>
      <div className="productcard__prices">
        <div className="productcard__price">{`$${product.price}`}</div>
      </div>
      <div className="productcard__line"></div>
      <div className="productcard__description">
        <div className="productcard__screen">
          <div className="productcard__screen--title">Screen</div>
          <div className="productcard__screen--value">{product.screen}</div>
        </div>
        <div className="productcard__capacity">
          <div className="productcard__capacity--title">Capacity</div>
          <div className="productcard__capacity--value">{product.capacity}</div>
        </div>
        <div className="productcard__ram">
          <div className="productcard__ram--title">RAM</div>
          <div className="productcard__ram--value">{product.ram}</div>
        </div>
      </div>
      <div className="productcard__buttons">
        <button className="productcard__adding-button">Add to cart</button>
        <button className="productcard__button-with-heart"></button>
      </div>
    </div>
  );
};
