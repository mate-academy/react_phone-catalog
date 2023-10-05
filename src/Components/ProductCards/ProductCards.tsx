import { Link } from 'react-router-dom';
import { ProductsCardsButton } from './ProductsCardsButton/ProductsCardsButton';
import { ProductCardsPrice } from './ProductCardsPrice/ProductCardsPrice';
import {
  ProductsCardsFavorite,
} from './ProductsCardsFavorite/ProductsCardsFavorite';
import './ProductCards.scss';
import { Product } from './Product';

interface ProductCardsProps {
  product: Product;
}

export const ProductCards = ({ product }: ProductCardsProps) => {
  const {
    id,
    image,
    name,
    screen,
    capacity,
    ram,
    phoneId,
  } = product;

  return (
    <div className="glav">
      <main className="main">
        <div
          className="card"
          data-cy="cardsContainer"
          key={id}
        >
          <div className="card__image-block">
            <Link
              to={{
                pathname: `/phones/${phoneId}`,
              }}
            >
              <img src={`./new/${image}`} className="card__image" alt={name} />
            </Link>
          </div>
          <div className="card__info">
            <p className="card__info__text">{name}</p>
          </div>
          <ProductCardsPrice product={product} />
          <div className="card__after-el" />
          <div className="card__info-all">
            <div className="block-card">
              <div className="card__info-all-left">
                <p className="p-left">Screen</p>
                <p className="p-left">Capacity</p>
                <p className="p-left">RAM</p>
              </div>
              <div className="card__info-all-right">
                <p className="p-right">{screen}</p>
                <p className="p-right">{capacity}</p>
                <p className="p-right">{ram}</p>
              </div>
            </div>

            <div className="block-for-button">
              <ProductsCardsButton product={product} />
              <ProductsCardsFavorite product={product} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
