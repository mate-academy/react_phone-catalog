import { Link } from 'react-router-dom';
import { Product } from '../../helper/Product';
import './ProductCard.scss';

interface Props {
  product: Product;
  sectionType: string;
}

export const ProductCard = ({ product, sectionType }: Props) => {
  const { image, fullPrice, capacity, screen, ram, name, price, phoneId } =
    product;

  return (
    <Link to={`../product/${phoneId}`} className="cardsContainer__card card">
      <div className="card__icon">
        <img
          className="card__icon-image"
          src={`_new/${image}`}
          alt="pictures of product"
        />
      </div>

      <div className="card__list">
        <div className="card__item">
          <div className="card__theme">
            {name} {ram}
          </div>

          <div className="card__price">
            {sectionType === 'hotPrices' && (
              <div className="card__price--discPrice">{`$${price}`}</div>
            )}
            <div className={`card__price--${sectionType}`}>
              {`$${fullPrice}`}
            </div>
          </div>
        </div>

        <div className="card__item">
          <div className="card__char">
            <p className="card__char--title">Screen</p>
            <p className="card__char--descr">{screen}</p>
          </div>
          <div className="card__char">
            <p className="card__char--title">Capasity</p>
            <p className="card__char--descr">{capacity}</p>
          </div>
          <div className="card__char">
            <p className="card__char--title">RAM</p>
            <p className="card__char--descr">{ram}</p>
          </div>
        </div>
        <div className="card__item">
          <div className="card__buttons">
            <button className="card__button">Add to cart</button>

            <div className="card__favor">
              <img
                src="./img/Favourites.jpg"
                alt="favourites"
                className="card__favor-icon"
              />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};
