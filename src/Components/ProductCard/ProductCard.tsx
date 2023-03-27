import classNames from 'classnames';
import { FC, useMemo, useState } from 'react';
import { Product } from '../../types/Product';
import './ProductCard.scss';

type Props = {
  product: Product,
  isDiscount: boolean,
};

export const ProductCard: FC<Props> = ({ product, isDiscount = false }) => {
  const [isActiveLikeButton, setIsActiveLikeButton] = useState(false);
  const [isActiveAddButton, setIsActiveAddButton] = useState(false);
  const discountPrice = useMemo(() => (
    product.price - (product.price * product.discount) / 100
  ), []);

  const hendlerLike = () => {
    setIsActiveLikeButton(prevState => !prevState);
  };

  const hendlerAdd = () => {
    setIsActiveAddButton(prevState => !prevState);
  };

  return (
    <>
      <img
        className="productCard__image"
        src={`./${product.imageUrl}`}
        alt={product.name}
      />
      <p className="productCard__title">{product.name}</p>
      <div className="productCard__price">
        {isDiscount ? (
          <>
            <p className="productCard__newPrice">{`$${discountPrice}`}</p>
            <p className="productCard__oldPrice">{`$${product.price}`}</p>
          </>
        ) : (
          <>
            <p className="productCard__newPrice">{`$${product.price}`}</p>
          </>
        )}
      </div>
      <div className="productCard__description">
        <p className="productCard__descriptionTitle">Screen</p>
        <p className="productCard__descriptionCard">
          {`${Number.parseFloat(product.screen)}`}
          &#8221;
          {'  OLED'}
        </p>
      </div>
      <div className="productCard__description">
        <p className="productCard__descriptionTitle">Capacity</p>
        <p className="productCard__descriptionCard">{product.capacity && `${Number.parseFloat(product.capacity) / 1000} GB`}</p>
      </div>
      <div className="productCard__description">
        <p className="productCard__descriptionTitle">RAM</p>
        <p className="productCard__descriptionCard">{product.ram && `${Number.parseFloat(product.ram) / 1000} GB`}</p>
      </div>
      <div className="productCard__buttons">
        <button
          type="button"
          onClick={hendlerAdd}
          className={classNames(
            'productCard__button',
            { 'productCard__button--active': isActiveAddButton },
          )}
        >
          Add to cart
        </button>
        {/* eslint-disable-next-line */}
        <button
          type="button"
          onClick={hendlerLike}
          className={classNames(
            'productCard__like',
            { 'productCard__like--active': isActiveLikeButton },
          )}
        />
      </div>
    </>
  );
};
