import { togglePhoneInStorage } from '../../../../utils/togglePhone';
import { addInCart } from '../../../../utils/addInCart';
import { Product } from '../../../../types/Product';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import './TabletsList.scss';

type Props = {
  tabletsList: Product[];
};

export const TabletsList: React.FC<Props> = ({ tabletsList }) => {
  const [favourites, setFavourites] = useState<Product[] | []>([]);
  const [elementsCart, setElementsCart] = useState<Product[]>([]);

  useEffect(() => {
    setFavourites(JSON.parse(localStorage.getItem('tablets') || '[]'));
    setElementsCart(JSON.parse(localStorage.getItem('cart') || '[]'));
  }, []);

  if (!elementsCart) {
    return null;
  }

  return (
    <div className="tablets-list">
      {tabletsList.map(tablet => {
        return (
          <article key={tablet.id} className="tablet-card">
            <div className="tablet-card__content">
              <Link
                state={{ from: 'Tablets' }}
                className="tablet-card__img"
                to={`/product/${tablet.name}`}
              >
                <img src={tablet.images[0]} alt="tablet-img" />
              </Link>

              <Link
                state={{ from: 'Tablets' }}
                to={`/product/${tablet.name}`}
                className="tablet-card__box"
              >
                <p className="tablet-card__box-p">{tablet.name}</p>
              </Link>

              <div className="tablet-card__price">{`$${tablet.priceRegular}`}</div>

              <div className="tablet-card__characteristics">
                <div className="tablet-card__characteristics-item">
                  <div className="characteristics-text">Scrin</div>
                  <div className="characteristics-text screen">
                    {tablet.screen}
                  </div>
                </div>

                <div className="tablet-card__characteristics-item">
                  <div className="characteristics-text">Capacity</div>
                  <div className="characteristics-text">{tablet.capacity}</div>
                </div>

                <div className="tablet-card__characteristics-item">
                  <div className="characteristics-text">RAM</div>
                  <div className="characteristics-text">{tablet.ram}</div>
                </div>
              </div>

              <div className="tablet-card__down">
                <button
                  className={classNames('tablet-card__down-button', {
                    'in-cart': elementsCart.some(obj => obj.id === tablet.id),
                  })}
                  onClick={() => {
                    const elements = addInCart(tablet);

                    setElementsCart(elements);
                  }}
                >
                  {elementsCart.some(obj => obj.id === tablet.id)
                    ? 'Added to cart'
                    : 'Add to card'}
                </button>

                <div
                  className="tablet-card__down-button-save"
                  onClick={() => {
                    const newFavourites = togglePhoneInStorage(
                      tablet,
                      'tablets',
                    );

                    setFavourites(newFavourites);
                  }}
                >
                  <div
                    className={classNames('tablet-card__down-button-save-img', {
                      'is-favourites': favourites.some(
                        item => item.id === tablet.id,
                      ),
                    })}
                  ></div>
                </div>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
};
