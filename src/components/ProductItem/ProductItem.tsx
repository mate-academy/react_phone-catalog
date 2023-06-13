import './ProductItem.scss';

import { Link } from 'react-router-dom';

import { Product } from '../../types/Product';

type Props = {
  product: Product,
  addProductToCart: (product: Product) => void,
};

export const ProductItem: React.FC<Props> = ({
  product,
  addProductToCart,
}) => {
  const {
    category,
    image,
    itemId,
    name,
    price,
    fullPrice,
    screen,
    capacity,
    ram,
  } = product;

  const onAddToCart = (item: Product) => {
    addProductToCart(item);
  };

  const scrollUp = () => {
    document.querySelector('.page')?.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <li className="product-item__item">
      <Link
        to={`/${category}/${itemId}`}
        className="product-item__link"
        onClick={scrollUp}
      >
        <div className="product-item__image-container">
          <img
            className="product-item__image"
            src={`/${image}`}
            alt={itemId}
          />
        </div>
      </Link>

      <Link
        to={`/${category}/${itemId}`}
        className="product-item__link"
        onClick={scrollUp}
      >
        <div className="product-item__subtitle">
          {name}
        </div>
      </Link>

      <div className="product-item__price">
        <div className="product-item__price-discount">
          {`$${price}`}
        </div>

        <div className="product-item__price-regular">
          {`$${fullPrice}`}
        </div>
      </div>

      <div className="product-item__info product-item__info--first">
        <span className="product-item__characteristic">
          Screen
        </span>

        <span className="product-item__value">
          {screen}
        </span>

        <span className="product-item__characteristic">
          Capacity
        </span>

        <span className="product-item__value">
          {capacity}
        </span>

        <span className="product-item__characteristic">
          RAM
        </span>

        <span className="product-item__value">
          {ram}
        </span>
      </div>

      <div className="product-item__buttons">
        <button
          type="button"
          className="product-item__button button"
          onClick={() => onAddToCart(product)}
        >
          Add to cart
        </button>

        <button
          type="button"
          className="
            product-item__button
            button-square
            button-square--like
          "
        >
          <img
            src="/img/icons/like.svg"
            alt="like"
          />
        </button>
      </div>

    </li>
  );
};
