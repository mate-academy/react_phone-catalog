import { togglePhoneInStorage } from '../../../../utils/togglePhone';
import { addInCart } from '../../../../utils/addInCart';
import { Product } from '../../../../types/Product';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import './PhonesList.scss';

type Props = {
  phonesList: Product[];
};

export const PhonesList: React.FC<Props> = ({ phonesList }) => {
  const [favourites, setFavourites] = useState<Product[] | []>([]);
  const [elementsCart, setElementsCart] = useState<Product[]>([]);

  useEffect(() => {
    setFavourites(JSON.parse(localStorage.getItem('phones') || '[]'));
    setElementsCart(JSON.parse(localStorage.getItem('cart') || '[]'));
  }, []);

  return (
    <div className="phones-list">
      {phonesList.map(phone => {
        return (
          <article key={phone.id} className="phone-card">
            <div className="phone-card__content">
              <Link
                state={{ from: 'Phones' }}
                className="phone-card__img"
                to={`/product/${phone.name}`}
              >
                <img src={phone.images[0]} alt="Phone-img" />
              </Link>

              <Link
                state={{ from: 'Phones' }}
                to={`/product/${phone.name}`}
                className="phone-card__box"
              >
                <p className="phone-card__box-p">{phone.name}</p>
              </Link>

              <div className="phone-card__price">{`$${phone.priceRegular}`}</div>

              <div className="phone-card__characteristics">
                <div className="phone-card__characteristics-item">
                  <div className="characteristics-text">Scrin</div>
                  <div className="characteristics-text scrin">
                    {phone.screen}
                  </div>
                </div>

                <div className="phone-card__characteristics-item">
                  <div className="characteristics-text">Capacity</div>
                  <div className="characteristics-text">{phone.capacity}</div>
                </div>

                <div className="phone-card__characteristics-item">
                  <div className="characteristics-text">RAM</div>
                  <div className="characteristics-text">{phone.ram}</div>
                </div>
              </div>

              <div className="phone-card__down">
                <button
                  className={classNames('phone-card__down-button', {
                    'in-cart': elementsCart.some(obj => obj.id === phone.id),
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
                  className="phone-card__down-button-save"
                  onClick={() => {
                    const newFavourites = togglePhoneInStorage(phone, 'phones');

                    setFavourites(newFavourites);
                  }}
                >
                  <div
                    className={classNames('phone-card__down-button-save-img', {
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
