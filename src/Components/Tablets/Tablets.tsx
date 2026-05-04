/* eslint-disable max-len */
import { Link } from 'react-router-dom';
import { Filter } from '../Filter/Filter';
import { Header } from '../Header/header';
import ArrowGray from '../../images/icons/ChevronGray.svg';
import Home from '../../images/icons/Home.svg';
import './Tablets.scss';
import fav from '../../images/fav/Icons/Favourites (Heart Like).svg';
import activeFav from '../../images/icons/ActiveFav.svg';
import { useEffect, useState } from 'react';
import { getTablets } from '../../api/api';
import { Tablet } from '../../types/Tablets';
import { Products } from '../../types/Products';
import { useCart } from '../../Context/Context';
import { useFav } from '../../Context/FavouritesContext';
import React from 'react';

export const Tablets = () => {
  const [tablets, setTablets] = useState<Tablet[]>([]);
  const [, setLoading] = useState(true);
  const [, setErrorMessage] = useState('');
  const { totalQuantity, addToCart, removeFromCart, isInCart } = useCart();
  const { addToFav, removeFromFav, isInFav } = useFav();

  const mapTabletToProduct = (tablet: Tablet): Products => ({
    id: String(tablet.id),
    itemId: String(tablet.id),
    name: tablet.name,
    category: tablet.category,
    fullPrice: Number(tablet.priceRegular),
    price: Number(tablet.priceDiscount || tablet.priceRegular),
    screen: tablet.screen,
    capacity: tablet.capacity,
    color: tablet.color || tablet.colorsAvailable?.[0] || '—',
    ram: tablet.ram,
    year: new Date().getFullYear(),
    image:
      typeof tablet.images === 'string'
        ? tablet.images
        : (tablet.images?.[0] ?? '/img/placeholder.png'),
  });

  useEffect(() => {
    setLoading(true);
    setErrorMessage('');

    getTablets()
      .then(setTablets)
      .catch(() => setErrorMessage(`Couldn't load any tablets`))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="tablets">
      <Header cartItemsCount={totalQuantity} />
      <div className="container">
        <div className="tablets__path page__path">
          <div className="tablets__path-icon">
            <Link to="/" className="tablets__icon-link page__icon-link">
              <img
                className="tablets__icon-home page__icon icon-home icon"
                src={Home}
                alt="Home"
              />
              <img
                className="tablets__icon-home icon-home icon"
                src={ArrowGray}
                alt="Arrow"
              />
            </Link>
          </div>
          <span className="tablets__path-tablet page__paths">Tablets</span>
        </div>
        <div className="tablets__text page__text">
          <p className="tablets__title page__title">Tablets</p>
          <span className="tablets__subtitle page__subtitle">24 models</span>
        </div>
        <Filter />
        <div className="tablets__content">
          <section className="page__models section">
            <div className="page__models-tablet tablet__articles page__grid">
              {tablets.map(tablet => {
                const product = mapTabletToProduct(tablet);
                const added = isInCart(product.id);
                const addedFav = isInFav(product.id);

                return (
                  <article key={tablet.id} className="page__models-phone">
                    <div className="page__models-container">
                      <div className="page__models-img">
                        <img
                          src={product.image}
                          alt=""
                          className="page__models-image"
                        />
                      </div>
                      <p className="page__models-title">{tablet.name}</p>
                      <span className="page__models-price">
                        {tablet.priceRegular}$
                      </span>
                      <div className="page__models-string"></div>
                      <div className="page__models-info">
                        <p className="page_models-text page__models-text__first">
                          Screen{' '}
                          <span className="page__models-span">
                            {tablet.screen}
                          </span>
                        </p>
                        <p className="page__models-text">
                          Capacity{' '}
                          <span className="page__models-span">
                            {tablet.capacity}
                          </span>
                        </p>
                        <p className="page__models-text">
                          RAM{' '}
                          <span className="page__models-span">
                            {tablet.ram}
                          </span>
                        </p>
                      </div>
                      <div className="page__models-buttons">
                        <button
                          className={`page__models-cart ${added ? 'page__models-cart-active' : ''}`}
                          type="button"
                          onClick={() =>
                            added
                              ? removeFromCart(product.id)
                              : addToCart(product)
                          }
                        >
                          <p className="page__models-cart__text">
                            {added ? 'Added' : 'Add to cart'}
                          </p>
                        </button>
                        <button
                          className="page__models-fav"
                          type="button"
                          onClick={() =>
                            addedFav
                              ? removeFromFav(product.id)
                              : addToFav(product)
                          }
                        >
                          <img
                            className="page__models-fav__img"
                            src={addedFav ? activeFav : fav}
                            alt="Favourites"
                          />
                        </button>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </section>
        </div>
      </div>

      {/* <div className="page__footer">
        <Footer />
      </div> */}
    </div>
  );
};
