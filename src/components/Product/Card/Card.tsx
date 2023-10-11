import { Link } from 'react-router-dom';
import { Product } from '../../../types/Product';
import { ProductTitles } from '../../../types/ProductTitles';

import './Card.scss';

import { ButtonCart } from '../../Button/ButtonCart';
import { ButtonFavorites } from '../../Button/ButtonFavorites';
import { IMAGE_URL } from '../../../helpers/IMAGE_URL';
import { handleBackToTop } from '../../../helpers/handleToUp';

type Props = {
  product: Product,
  title?: ProductTitles,
};

export const ProductCard: React.FC<Props> = ({
  product,
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
        onClick={handleBackToTop}
      >
        <img
          src={`${IMAGE_URL}${image}`}
          alt={name}
          className="product-card--image"
        />
        <p className="product-card__title">
          {name}
        </p>
        <div className="product-card__price">
          {price === fullPrice ? (
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

      </Link>

      <div className="product-card__buttons">
        <div className="product-card__buttons--cart">
          <ButtonCart
            product={product}
          />
        </div>

        <div className="product-card__buttons--favorites">
          <ButtonFavorites
            product={product}
          />
        </div>
      </div>
    </div>
  );
};
