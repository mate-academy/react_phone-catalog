import { togglePhoneInStorage } from '../../../../utils/togglePhone';
import { addInCart } from '../../../../utils/addInCart';
import { Product } from '../../../../types/Product';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import './AccessoriesList.scss';

type Props = {
  accessoriesList: Product[];
};

export const AccessoriesList: React.FC<Props> = ({ accessoriesList }) => {
  const [favourites, setFavourites] = useState<Product[] | []>([]);
  const [elementsCart, setElementsCart] = useState<Product[]>([]);

  useEffect(() => {
    setFavourites(JSON.parse(localStorage.getItem('accessories') || '[]'));
    setElementsCart(JSON.parse(localStorage.getItem('cart') || '[]'));
  }, []);

  if (!elementsCart) {
    return null;
  }

  return (
    <div className="accessories-list">
      {accessoriesList.map(accessories => {
        return (
          <article key={accessories.id} className="accessories-card">
            <div className="accessories-card__content">
              <Link
                state={{ from: 'Accessories' }}
                className="accessories-card__img"
                to={`/product/${accessories.name}`}
              >
                <img src={accessories.images[0]} alt="accessories-img" />
              </Link>

              <Link
                state={{ from: 'Accessories' }}
                to={`/product/${accessories.name}`}
                className="accessories-card__box"
              >
                <p className="accessories-card__box-p">{accessories.name}</p>
              </Link>

              <div className="accessories-card__price">{`$${accessories.priceRegular}`}</div>

              <div className="accessories-card__characteristics">
                <div className="accessories-card__characteristics-item">
                  <div className="characteristics-text">Scrin</div>
                  <div className="characteristics-text screen">
                    {accessories.screen}
                  </div>
                </div>

                <div className="accessories-card__characteristics-item">
                  <div className="characteristics-text">Capacity</div>
                  <div className="characteristics-text">{accessories.capacity}</div>
                </div>

                <div className="accessories-card__characteristics-item">
                  <div className="characteristics-text">RAM</div>
                  <div className="characteristics-text">{accessories.ram}</div>
                </div>
              </div>

              <div className="accessories-card__down">
                <button
                  className={classNames('accessories-card__down-button', {
                    'in-cart': elementsCart.some(obj => obj.id === accessories.id),
                  })}
                  onClick={() => {
                    const elements = addInCart(accessories);

                    setElementsCart(elements);
                  }}
                >
                  {elementsCart.some(obj => obj.id === accessories.id)
                    ? 'Added to cart'
                    : 'Add to card'}
                </button>

                <div
                  className="accessories-card__down-button-save"
                  onClick={() => {
                    const newFavourites = togglePhoneInStorage(
                      accessories,
                      'accessories',
                    );

                    setFavourites(newFavourites);
                  }}
                >
                  <div
                    className={classNames('accessories-card__down-button-save-img', {
                      'is-favourites': favourites.some(
                        item => item.id === accessories.id,
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
