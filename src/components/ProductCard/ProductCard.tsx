import { Link } from 'react-router-dom';
import { Product } from '../../types/Product';
import { ProductTitles } from '../../types/ProductTitles';

import './ProductCard.scss';

import { ButtonCart } from '../Button/ButtonCart';
import { ButtonFavourites } from '../Button/ButtonFavorites';

type Props = {
  product: Product,
  title?: ProductTitles,
};

const URL = 'https://mate-academy.github.io/react_phone-catalog/_new/';

export const ProductCard: React.FC<Props> = ({
  product,
  title,
}) => {
  const {
    screen,
    capacity,
    ram,
    price,
    fullPrice,
    name,
    category,
    phoneId,
    image,
  } = product;

  return (
    <div className="product-card">
      <Link
        className="product-card__link"
        to={`/${category}/${phoneId}`}
      >
        <img
          src={`${URL}${image}`}
          alt={name}
          className="product-card--image"
        />
        <p className="product-card__title">
          {name}
        </p>
        <div className="product-card__price">
          {title === ProductTitles.NewBrand ? (
            <h2 className="product-card__price-regular">
              {`$${fullPrice}`}
            </h2>
          ) : (
            <>
              <h2 className="product-card__price-regular">
                {`$${price}`}
              </h2>

              <h2 className="product-card__price-discount">
                {`$${fullPrice}`}
              </h2>
            </>
          )}

        </div>
      </Link>
      <div className="product-card__properties">
        <div className="product-card__property">
          <p className="product-card__property--title">
            Screen
          </p>
          <p className="product-card__property--value">
            {screen}
          </p>
        </div>

        <div className="product-card__property">
          <p className="product-card__property--title">
            Capacity
          </p>
          <p className="product-card__property--value">
            {capacity}
          </p>
        </div>

        <div className="product-card__property">
          <p className="product-card__property--title">
            Ram
          </p>
          <p className="product-card__property--value">
            {ram}
          </p>
        </div>
      </div>

      <div className="product-card__buttons">
        <ButtonCart
          product={product}
        />

        <ButtonFavourites
          product={product}
        />
      </div>
    </div>
  );
};
