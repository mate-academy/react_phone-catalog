import { deleteElement } from '../../../utils/deleteElement';
import { getAllKeys } from '../../../utils/getAllKeys';
import { addInCart } from '../../../utils/addInCart';
import { Product } from '../../../types/Product';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import './Favourites.scss';

export const Favourites = () => {
  const [showElements, setShowElements] = useState<Product[] | []>([]);
  const [elementsCart, setElementsCart] = useState<Product[]>([]); // Список товарів, які вже в кошику (для стилізації кнопки)

  useEffect(() => {
    setShowElements(getAllKeys());
    setElementsCart(JSON.parse(localStorage.getItem('cart') || '[]'));
  }, []);

  return (
    <>
      {showElements.length === 0 ? (
        <div className="favourites-empty">
          <img
            className="favourites-empty__img"
            src="/img/favorites-image.avif"
            alt="Favourites is empty"
          />
        </div>
      ) : (
        <section className="favourites">
          <div className="favourites-content">
            <div className="favourites__top">
              <div className="favourites__top-breadcrumb">
                <Link to="/">
                  <img src="/icons/icon-house.svg" alt="Icon House" />
                </Link>

                <div className="favourites__top-breadcrumb-arrow"></div>

                <div className="favourites__top-breadcrumb-p">Favourites</div>
              </div>

              <h1 className="favourites__top-h1">Favourites</h1>

              <div className="favourites__top-items">{`${showElements.length} items`}</div>
            </div>

            <div className="favourites__bottom">
              <ul className="favourites__bottom-list">
                {showElements.map(el => {
                  return (
                    <article key={el.id} className="card">
                      <div className="card__content">
                        <Link
                          state={{ from: 'Favourites' }}
                          to={`/product/${el.name}`}
                        >
                          <img
                            className="card__content-img"
                            src={`/${el.images[0]}`}
                            alt="Phone-img"
                          />
                        </Link>

                        <Link
                          className="card__content-name"
                          to={`/product/${el.name}`}
                          state={{ from: 'Favourites' }}
                        >
                          {el.name}
                        </Link>

                        <div className="card__content-prices">
                          <div className="card__content-prices-regular">{`$${el.priceRegular}`}</div>
                          <div className="card__content-prices-discount">{`$${el.priceDiscount}`}</div>
                        </div>

                        <div className="card__content-characteristics">
                          <div className="card__content-characteristics-item">
                            <div className="characteristics-text first">
                              Scrin
                            </div>
                            <div className="characteristics-text second">
                              {el.screen}
                            </div>
                          </div>

                          <div className="card__content-characteristics-item">
                            <div className="characteristics-text first">
                              Capacity
                            </div>
                            <div className="characteristics-text">
                              {el.capacity}
                            </div>
                          </div>

                          <div className="card__content-characteristics-item">
                            <div className="characteristics-text first">
                              RAM
                            </div>
                            <div className="characteristics-text">{el.ram}</div>
                          </div>
                        </div>

                        <div className="card__content-down">
                          <button
                            className={classNames('card__content-down-add', {
                              'in-cart': elementsCart.some(
                                obj => obj.id === el.id,
                              ),
                            })}
                            onClick={() => {
                              const elements = addInCart(el);

                              setElementsCart(elements);
                            }}
                          >
                            {elementsCart.some(obj => obj.id === el.id)
                              ? 'Added to cart'
                              : 'Add to cart'}
                          </button>

                          <div
                            className="card__content-down-save"
                            onClick={() => {
                              const updated = deleteElement(el);

                              setShowElements(updated);
                            }}
                          >
                            <div
                              className={classNames(
                                'card__content-down-save-img',
                                {
                                  'is-favourites': showElements.some(
                                    item => item.id === el.id,
                                  ),
                                },
                              )}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </ul>
            </div>
          </div>
        </section>
      )}
    </>
  );
};
