import React from 'react';
import './ChangeCard.scss';
import productList from '../../../../api/products.json';
import colorList from '../../../../api/colors.json';
import { ProductMore } from '../../../type/Product';
import classNames from 'classnames';
import { CardButton } from '../../../ProductCard/CardButton/CardButton';
import { Tech } from '../Tech/Tech';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

type Props = {
  product: ProductMore;
};

export const ChangeCard: React.FC<Props> = ({ product }) => {
  const { t } = useTranslation();

  const infOfProductToCart = productList.find(
    productFromList => productFromList.name === product.name,
  );

  return (
    <div className="change-card">
      <div className="change-card__block">
        <p className="text--small change-card__text">{t('changeCard.0')}</p>
        <div className="change-card__block__content">
          {product.colorsAvailable.map(colorName => {
            const colorObj = colorList.find(c => c.color === colorName);

            return (
              <Link
                key={product.namespaceId}
                className="card__link"
                to={`/${product.category}/${product.namespaceId}-${product.capacity.toLocaleLowerCase()}-${colorName.replace(/\s+/g, '-')}`}
              >
                <div
                  className={classNames('color', {
                    'color--active': colorObj?.color === product.color,
                  })}
                  style={{ backgroundColor: colorObj?.hex }}
                ></div>
              </Link>
            );
          })}
        </div>
      </div>

      <div className="change-card__block">
        <p className="text--small change-card__text">{t('changeCard.1')}</p>
        <div className="change-card__block__content">
          {product.capacityAvailable.map(capacity => (
            <Link
              className="card__link"
              to={`/${product.category}/${product.namespaceId}-${capacity.toLocaleLowerCase()}-${product.color}`}
              key={capacity}
            >
              <p
                className={classNames('capacity text--body', {
                  'capacity--active': capacity === product.capacity,
                })}
              >
                {capacity}
              </p>
            </Link>
          ))}
        </div>
      </div>
      <div className="change-card__price-buttons">
        <div className="card__price text--h3">
          <span className="card__price--new">${product.priceDiscount}</span>
          <span className="card__price--old">${product.priceRegular}</span>
        </div>
        {infOfProductToCart && (
          <CardButton product={infOfProductToCart} isBigCard={true} />
        )}
      </div>
      <Tech product={product} isBigBlock={false} />
    </div>
  );
};
