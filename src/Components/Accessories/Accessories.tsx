/* eslint-disable max-len */
import { Link } from 'react-router-dom';
import { Filter } from '../Filter/Filter';
import { Header } from '../Header/header';
import ArrowGray from '../../images/icons/ChevronGray.svg';
import Home from '../../images/icons/Home.svg';
import './Accessories.scss';
import { getAccessories } from '../../api/api';
import { useEffect, useState } from 'react';
import { Accessorie } from '../../types/Accessories';
import fav from '../../images/fav/Icons/Favourites (Heart Like).svg';
import activeFav from '../../images/icons/ActiveFav.svg';
import { Products } from '../../types/Products';
import { useCart } from '../../Context/Context';
import { useFav } from '../../Context/FavouritesContext';

export const Accessories = () => {
  const [accessories, setAccessories] = useState<Accessorie[]>([]);
  const [, setLoading] = useState(true);
  const [, setErrorMessage] = useState('');
  const { totalQuantity, addToCart, removeFromCart, isInCart } = useCart();
  const { addToFav, removeFromFav, isInFav } = useFav();

  const mapAccessorieToProduct = (accessorie: Accessorie): Products => ({
    id: String(accessorie.id),
    itemId: String(accessorie.id),
    name: accessorie.name,
    category: accessorie.category,
    fullPrice: Number(accessorie.priceRegular),
    price: Number(accessorie.priceDiscount || accessorie.priceRegular),
    screen: accessorie.screen,
    capacity: accessorie.capacity,
    color: accessorie.color || accessorie.colorsAvailable?.[0] || '—',
    ram: accessorie.ram,
    year: new Date().getFullYear(),
    image:
      typeof accessorie.images === 'string'
        ? accessorie.images
        : (accessorie.images?.[0] ?? '/img/placeholder.png'),
  });

  useEffect(() => {
    setLoading(true);
    setErrorMessage('');

    getAccessories()
      .then(setAccessories)
      .catch(() => setErrorMessage(`Couldn't load any tablets`))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="tablets">
      <Header cartItemsCount={totalQuantity} />
      <div className="container">
        <div className="accessories__path page__path">
          <div className="accessories__path-icon">
            <Link to="/" className="accessories__icon-link page__icon-link">
              <img
                className="accessories__icon-home page__icon icon-home icon"
                src={Home}
                alt="Home"
              />
              <img
                className="accessories__icon-home icon-home icon"
                src={ArrowGray}
                alt="Arrow"
              />
            </Link>
          </div>
          <span className="accessories__path-phones page__paths">
            Accessories
          </span>
        </div>
        <div className="Accessories__text page__text">
          <p className="Accessories__title page__title">Accessories</p>
          <span className="accessories__subtitle page__subtitle">
            100 models
          </span>
        </div>
        <Filter />
        <div className="tablets__content">
          <section className="page__models section">
            <div className="page__models-tablet tablet__articles page__grid">
              {accessories.map(accessorie => {
                const product = mapAccessorieToProduct(accessorie);
                const added = isInCart(product.id);
                const addedFav = isInFav(product.id);

                return (
                  <article key={accessorie.id} className="page__models-phone">
                    <div className="page__models-container">
                      <div className="page__models-img">
                        <img
                          src={product.image}
                          alt=""
                          className="page__models-image"
                        />
                      </div>
                      <p className="page__models-title">{accessorie.name}</p>
                      <span className="page__models-price">
                        {accessorie.priceRegular}$
                      </span>
                      <div className="page__models-string"></div>
                      <div className="page__models-info">
                        <p className="page_models-text page__models-text__first">
                          Screen{' '}
                          <span className="page__models-span">
                            {accessorie.screen}
                          </span>
                        </p>
                        <p className="page__models-text">
                          Capacity{' '}
                          <span className="page__models-span">
                            {accessorie.capacity}
                          </span>
                        </p>
                        <p className="page__models-text">
                          RAM{' '}
                          <span className="page__models-span">
                            {accessorie.ram}
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
