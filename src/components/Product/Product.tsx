import { ProductType } from '../../types/ProductType';
import { Icon } from '../Icon';
import './Product.scss';

type Props = {
  className?: string;
  product: ProductType;
};

export const Product: React.FC<Props> = ({ className = '', product }) => (
  <article className={`product ${className}`.trim()}>
    <a className="product__img-link" href="#">
      <img className="product__img" src={product.image} alt={product.name} />
    </a>
    <h3 className="product__title">{product.name}</h3>
    <div className="product__prices">
      <span className="product__price">{`$${product.price}`}</span>
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
      <button className="product__button-cart" type="button">
        Add to cart
      </button>
      <button className="product__button-fav" type="button">
        <Icon iconName="icon-heart" />
      </button>
    </div>
  </article>
);
