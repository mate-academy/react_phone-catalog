import './ProductCard.scss';

import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { Product } from '../../types/Product';
import { MAIN_URL } from '../../helpers/api';
import { Actions } from '../Actions';

enum PropertyNames {
  Screen = 'screen',
  Capacity = 'capacity',
  Ram = 'ram',
}

type Props = {
  product: Product,
};

export const ProductCard: React.FC<Props> = ({ product }) => {
  const {
    itemId,
    image,
    name,
    price,
    fullPrice,
    category,
  } = product;

  return (
    <Link
      to={`/${category}/${itemId}`}
      className="ProductCard"
      data-cy="cardsContainer"
    >
      <div className="ProductCard__image-wrapper">
        <img
          src={`${MAIN_URL}/${image}`}
          alt={name}
          className="ProductCard__image"
        />
      </div>

      <div className="ProductCard__info">
        <h2 className="ProductCard__title">{name.toLowerCase()}</h2>

        <div className="ProductCard__price price">
          <span className="price__discount">
            &#36;
            {price}
          </span>

          <span className="price__full">
            &#36;
            {fullPrice}
          </span>
        </div>

        <ul className="ProductCard__properties">
          {Object.values(PropertyNames).map(property => (
            <li key={property} className="ProductCard__property">
              <span
                className={classNames('ProductCard__property-name', {
                  // eslint-disable-next-line max-len
                  'ProductCard__property-name--ram': property === PropertyNames.Ram,
                })}
              >
                {property}
              </span>

              <span className="ProductCard__property-value">
                {product[property]}
              </span>
            </li>
          ))}
        </ul>

        <Actions product={product} />
      </div>
    </Link>
  );
};
