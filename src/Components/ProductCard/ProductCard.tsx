import { Link } from 'react-router-dom';
import { Product } from '../../helper/Product';
import './ProductCard.scss';
import { useContext, useEffect } from 'react';
import { ProductContext } from '../../helper/ProductContext';
import { handleAddButton, handleFavorites } from '../../helper/handlers';

interface Props {
  product: Product;
  sectionType: string;
}

export const ProductCard = ({ product, sectionType }: Props) => {
  const { image, fullPrice, capacity, screen, ram, name, price, itemId } =
    product;
  const { card, favorites, setFavorites, setCard, setCategory, setAmountCard } =
    useContext(ProductContext);
  const sameFavorites = favorites.some(c => c.id === product.id);
  const sameCard = card.some(c => c.id === product.id);

  useEffect(() => {
    setAmountCard(card.length);
  }, [card.length, setAmountCard]);

  return (
    <div className="cardsContainer__card card">
      <Link
        to={`../product/${itemId}`}
        className="card__link"
        onClick={() => setCategory(product.category)}
      >
        <div className="card__icon">
          <img
            className="card__icon-image"
            src={image}
            alt="pictures of product"
          />
        </div>
      </Link>

      <div className="card__list">
        <Link
          to={`../product/${itemId}`}
          className="card__link"
          onClick={() => setCategory(product.category)}
        >
          <div className="card__item">
            <div className="card__theme">
              {name} {ram}
            </div>

            <div className="card__price">
              {(sectionType === 'hotPrices' || sectionType === 'alsoLike') && (
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
        </Link>

        <div className="card__item">
          <div className="card__buttons">
            {sameCard ? (
              <button className="card__button added">Added to cart</button>
            ) : (
              <button
                className="card__button"
                onClick={() => {
                  handleAddButton(card, product, setCard, sameCard);
                }}
              >
                Add to cart
              </button>
            )}

            <div
              className="card__favor"
              onClick={() =>
                handleFavorites(favorites, product, setFavorites, sameFavorites)
              }
            >
              {sameFavorites ? (
                <img
                  src="./img/RedHurt.png"
                  alt="favourites"
                  className="card__favor-icon"
                />
              ) : (
                <img
                  src="./img/WhiteHurt.png"
                  alt="favourites"
                  className="card__favor-icon"
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
