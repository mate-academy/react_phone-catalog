import { Link } from 'react-router-dom';
import { Product } from '../../helpers/types/Product';
import { ProductsCardType } from '../../helpers/types/ProductsCardType';
import { FavoritesIcon } from '../../assets/icons/FavoritesIcon';
import './ProductCard.scss';

type Props = {
  product: Product;
  type: ProductsCardType,
  transform?: string
};

export const ProductCard: React.FC<Props> = ({ product, type, transform }) => {
  const {
    image, name, price, screen, fullPrice, capacity, ram, itemId, category,
  } = product;

  return (
    <div className="productCard" data-cy="cardsContainer" style={{ transform }}>
      <Link to={`/${category}/${itemId}`}>
        <img
          src={`_new/${image}`}
          alt={name}
          className="productCard__image"
        />
        <h3 className="productCard__title">{name}</h3>
      </Link>
      <div className="productCard__price">
        {type === ProductsCardType.DISCOUNT ? (
          <>
            <span className="productCard__price-main">{`$${price}`}</span>
            <s className="productCard__price-discount">
              {`$${fullPrice}`}
            </s>
          </>
        ) : (
          <span className="productCard__price-main">{`$${fullPrice}`}</span>
        )}
      </div>

      <ul className="productCard__parameters">
        <li className="productCard__text">
          <span className="productCard__text-title">Screen</span>
          <span className="productCard__text-value">{screen}</span>
        </li>
        <li className="productCard__text">
          <span className="productCard__text-title">Capacity</span>
          <span className="productCard__text-value">{capacity}</span>
        </li>
        <li className="productCard__text">
          <span className="productCard__text-title">RAM</span>
          <span className="productCard__text-value">{ram}</span>
        </li>
      </ul>

      <div className="productCard__button">
        <button type="button" className="productCard__button-add">
          Add to Cart
        </button>
        <div className="productCard__button-like">
          <FavoritesIcon />
        </div>
      </div>
    </div>
  );
};
