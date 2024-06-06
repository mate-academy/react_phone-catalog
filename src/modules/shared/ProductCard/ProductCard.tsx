import { Link } from 'react-router-dom';
import './ProductCard.scss';
import { Product } from '../../../types/Product';
import { ActionButtons } from '../ActionsButton';
import { useContext } from 'react';
import {
  ThemeContext,
  ThemeType,
} from '../../../contexts/ThemeContext/ThemeContext';
import classNames from 'classnames';

type Props = {
  product: Product;
  discount: boolean;
};

export const ProductCard: React.FC<Props> = ({ product, discount }) => {
  const { theme } = useContext(ThemeContext);
  const image = './' + product.image;

  return (
    <div
      className={classNames('product-card', { dark: theme === ThemeType.DARK })}
    >
      <div className="product-card__container">
        <div className="product-card__top">
          <Link
            to={`/${product.category}/${product.itemId}`}
            className="product-card__image-container"
          >
            <img
              src={`${image}`}
              alt={product.name}
              className="product-card__image"
            />
          </Link>

          <Link
            to={`/${product.category}/${product.itemId}`}
            className="product-card__name"
          >
            {product.name}
          </Link>

          <div className="product-card__cost">
            <p className="h3 product-card__price">${product.price}</p>
            {discount && (
              <p className="product-card__fullPrice">${product.fullPrice}</p>
            )}
          </div>
        </div>

        <div className="product-card__bottom">
          <span className="product-card__detail" />

          <div className="product-card__info">
            <div className="product-card__info-block">
              <p className="product-card__info-title small-text">Screen</p>
              <p className="product-card__info-text small-text uppercase">
                {product.screen}
              </p>
            </div>

            <div className="product-card__info-block">
              <p className="product-card__info-title small-text">Capacity</p>
              <p className="product-card__info-text small-text uppercase">
                {product.capacity}
              </p>
            </div>

            <div className="product-card__info-block">
              <p className="product-card__info-title uppercase small-text">
                Ram
              </p>
              <p className="product-card__info-text small-text uppercase">
                {product.ram}
              </p>
            </div>
          </div>

          <ActionButtons product={product} />
        </div>
      </div>
    </div>
  );
};
