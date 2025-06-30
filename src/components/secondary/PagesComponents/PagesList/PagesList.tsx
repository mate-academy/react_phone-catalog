import { togglePhoneInStorage } from '../../../../utils/togglePhone';
import { addInCart } from '../../../../utils/addInCart';
import { Product } from '../../../../types/Product';
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import classNames from 'classnames';
import './PagesList.scss';

type Props = {
  renderList: Product[];
};

export const PagesList: React.FC<Props> = ({ renderList }) => {
  const [favourites, setFavourites] = useState<Product[] | []>([]);
  const [elementsCart, setElementsCart] = useState<Product[]>([]);
  const { pathname } = useLocation();
  let isFrom = '';

  switch (pathname) {
    case 'phones':
      isFrom = 'Phones';
      break;
    case 'accessories':
      isFrom = 'Accessories';
      break;
    case 'tablets':
      isFrom = 'Tablets';
      break;
  }

  useEffect(() => {
    setFavourites(JSON.parse(localStorage.getItem('phones') || '[]'));
    setElementsCart(JSON.parse(localStorage.getItem('cart') || '[]'));
  }, []);

  return (
    <div className="pages-list">
      {renderList.map(phone => {
        return (
          <article key={phone.id} className="pages-card">
            <div className="pages-card__content">
              <Link
                state={{ from: isFrom }}
                className="pages-card__img"
                to={`/product/${phone.name}`}
              >
                <img src={phone.images[0]} alt="pages-img" />
              </Link>

              <Link
                state={{ from: 'Phones' }}
                to={`/product/${phone.name}`}
                className="pages-card__box"
              >
                <p className="pages-card__box-p">{phone.name}</p>
              </Link>

              <div className="pages-card__price">{`$${phone.priceRegular}`}</div>

              <div className="pages-card__characteristics">
                <div className="pages-card__characteristics-item">
                  <div className="characteristics-text">Scrin</div>
                  <div className="characteristics-text screen">
                    {phone.screen}
                  </div>
                </div>

                <div className="pages-card__characteristics-item">
                  <div className="characteristics-text">Capacity</div>
                  <div className="characteristics-text">{phone.capacity}</div>
                </div>

                <div className="pages-card__characteristics-item">
                  <div className="characteristics-text">RAM</div>
                  <div className="characteristics-text">{phone.ram}</div>
                </div>
              </div>

              <div className="pages-card__down">
                <button
                  className={classNames('pages-card__down-button', {
                    'in-cart': elementsCart.some(
                      obj =>
                        obj.id === phone.id &&
                        obj.capacity === phone.capacity &&
                        obj.color === phone.color,
                    ),
                  })}
                  onClick={() => {
                    const elements = addInCart(phone);

                    setElementsCart(elements);
                  }}
                >
                  {elementsCart.some(obj => obj.id === phone.id)
                    ? 'Added to cart'
                    : 'Add to card'}
                </button>

                <div
                  className="pages-card__down-button-save"
                  onClick={() => {
                    const newFavourites = togglePhoneInStorage(phone, 'phones');

                    setFavourites(newFavourites);
                  }}
                >
                  <div
                    className={classNames('pages-card__down-button-save-img', {
                      'is-favourites': favourites.some(
                        item => item.id === phone.id,
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
