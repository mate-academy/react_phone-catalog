import { Link } from 'react-router-dom';
import { Product } from '../../types/Product';
import { BASE_URL } from '../../api/api';
import './ProductCard.scss';

type Props = {
  product: Product;
};

export const ProductCard: React.FC<Props> = ({ product }) => {
  const {
    category,
    itemId,
    name,
    fullPrice,
    price,
    screen,
    capacity,
    ram,
    image,
  } = product;

  return (
    <div className="product-card" data-cy="cardsContainer">
      <Link to={`/${category}/${itemId}`}>
        <div className="product-card__image">
          <img
            src={`${BASE_URL}/${image}`}
            alt=" "
            className="product-card__image-phone"
          />
        </div>

        <p className="product-card__model">{name}</p>
      </Link>

      <div className="product-card__prices">
        <p className="product-card__price">{`$${price}`}</p>
        <p className="product-card__discount">{`$${fullPrice}`}</p>
      </div>

      <div className="product-card__about">
        <div className="product-card__about-container">
          <p className="product-card__about-name">Screen</p>
          <p className="product-card__about-spec">{screen}</p>
        </div>

        <div className="product-card__about-container">
          <p className="product-card__about-name">Capacity</p>
          <p className="product-card__about-spec">{capacity}</p>
        </div>

        <div className="product-card__about-container">
          <p className="product-card__about-name">RAM</p>
          <p className="product-card__about-spec">{ram}</p>
        </div>
      </div>

      <div className="product-card__button">
        {/* <ActionsBlock product={product} paddingFav="11px" /> */}
      </div>
    </div>
  );
};
