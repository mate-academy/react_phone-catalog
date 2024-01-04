import React from 'react';
import { Link } from 'react-router-dom';
import { ProductType } from '../../helpers/types/ProductType';
import { BASE_URL } from '../../helpers/utils/constants';
import './ProductCard.scss';
import { ButtonIcon } from '../../elements/ButtonIcon/ButtonIcon';
import { ButtonTexted } from '../../elements/ButtonTexted/ButtonTexted';
import { capitalize } from '../../helpers/utils/capitalize';
import { Line } from '../../elements/Line/Line';

type Props = {
  product: ProductType;
};

export const ProductCard: React.FC<Props> = ({ product }) => {
  const {
    image,
    name,
    fullPrice,
    price,
    phoneId,
    category,
  } = product;

  const details: Array <keyof ProductType> = ['screen', 'capacity', 'ram'];

  return (
    <div
      className="productCard"
    >
      <Link to={`/${category}/${phoneId}`} className="productCard__link">
        <div className="productCard__image-container">
          <img
            className="productCard__image"
            src={`${BASE_URL}${image}`}
            alt={name}
          />
        </div>
      </Link>

      <div className="productCard__content">
        <Link to={`/${category}/${phoneId}`} className="productCard__link">
          <div className="productCard__name-container">
            <p className="productCard__name">{name}</p>
          </div>

          <div className="productCard__prices">
            <p className="productCard__price">{`$${price}`}</p>
            <p className="productCard__fullprice">{`$${fullPrice}`}</p>
          </div>

          <Line />

          <div className="productCard__details">
            {details.map(detail => (
              <div key={detail} className="productCard__detail">
                <p className="productCard__detail-name">{capitalize(detail)}</p>
                <p className="productCard__detail-model">
                  {product[detail]}
                </p>
              </div>
            ))}
          </div>
        </Link>
        <div className="productCard__buttons">
          <ButtonTexted
            text="Add to cart"
            textActive="Added to cart"
            product={product}
          />

          <ButtonIcon
            type="event"
            shape="heart"
            dynamicClasses={['medium', 'light-border']}
            product={product}
            checkFav
          />
        </div>
      </div>
    </div>
  );
};
