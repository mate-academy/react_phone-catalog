import { Link } from 'react-router-dom';
import { ButtonFav } from '../ButtonFav/ButtonFav';
import { ButtonCart } from '../ButtonCart/ButtonCart';
import { Product } from '../../types/Product';
import { ProductSection } from '../../types/ProductSection';

type Props = {
  product: Product,
  title?: ProductSection,
};

export const ProductCard: React.FC<Props> = ({ product, title }) => {
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
    <div
      className="product-card"
      data-cy="cardsContainer"
    >
      <Link
        className="product-card__link"
        to={`/${category}/${phoneId}`}
      >
        <img
          className="product-card__img"
          src={`/new/${image}`}
          alt={name}
        />
        <div className="product-card__title">
          {name}
        </div>
        <div className="product-card__price">
          {title === ProductSection.NewBrand ? (
            <div className="product-card__price">
              {`${fullPrice}`}
            </div>
          ) : (
            <>
              <h2 className="product-card__price-regular">
                {`${price}`}
              </h2>

              <div className="product-card__price-discount">
                {`${fullPrice}`}
              </div>
            </>
          )}
        </div>
      </Link>
      <div className="product-card__properties">
        <div className="product-card__property">
          <p className="product-card__property-title">
            Screen
          </p>
          <p className="product-card__property-value">
            {screen}
          </p>
        </div>

        <div className="product-card__property">
          <p className="product-card__property-title">
            Capacity
          </p>
          <p className="product-card__property-value">
            {capacity}
          </p>
        </div>

        <div className="product-card__property">
          <p className="product-card__property-title">
            RAM
          </p>
          <p className="product-card__property-value">
            {ram}
          </p>
        </div>
      </div>
      <div className="product-card__buttons">
        <div className="product-card__button-cart">
          <ButtonCart product={product} />
        </div>
        <div className="product-card__button-fav">
          <ButtonFav product={product} />
        </div>
      </div>
    </div>
  );
};
