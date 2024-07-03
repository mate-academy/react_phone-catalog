import './HomePage.scss';
import { Link, NavLink, useLocation } from 'react-router-dom';
import Flickity from 'react-flickity-component';
import '../../auxiliary/flickity.scss';
import phonesImage from '../../images/banner-phones.png';
import tablets from '../../images/banner-tablets.png';
import accessorie from '../../images/banner-accessories.png';
import phones from '../../api/phones.json';
import { CardPhone } from '../../cardPhone';
import cn from 'classnames';
import { useEffect } from 'react';

interface Props {
  likeItems: CardPhone[];
  addFavouritesItems: (b: CardPhone) => void;
  addCartItems: (a: CardPhone) => void;
  cartItems: CardPhone[];
}

export const HomePage = ({
  likeItems,
  addFavouritesItems,
  addCartItems,
  cartItems,
}: Props) => {
  const flickityOptions = {
    autoPlay: 3000,
    wrapAround: true,
  };

  const cars = {
    id: [1, 2, 3],
    image: [phonesImage, tablets, accessorie],
  };

  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [pathname]);

  const paths = ['/phones', '/tablets', '/accessories'];

  return (
    <>
      <header className="header">
        <div className="header__navlist">
          <a href="#">
            <div className="header--logo"></div>
          </a>
          <ul className="header__list">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? 'header__active' : 'header__href'
              }
            >
              <li className="header__item">home</li>
            </NavLink>
            <NavLink
              to="/phones"
              className={({ isActive }) =>
                isActive ? 'header__active' : 'header__href'
              }
            >
              <li className="header__item">phones</li>
            </NavLink>
            <NavLink
              to="/tablets"
              className={({ isActive }) =>
                isActive ? 'header__active' : 'header__href'
              }
            >
              <li className="header__item">tablets</li>
            </NavLink>
            <NavLink
              to="/accessories"
              className={({ isActive }) =>
                isActive ? 'header__active' : 'header__href'
              }
            >
              <li className="header__item">accessories</li>
            </NavLink>
          </ul>
        </div>

        <Link to="/menu">
          <div className="header--menu"></div>
        </Link>

        <div className="header__navigation">
          <NavLink
            to="/favourites"
            className={({ isActive }) => (isActive ? 'header__activenav' : '')}
          >
            <div className="header__navigation--like">
              {likeItems.length !== 0 && (
                <div className="header__navigation--count">
                  <p className="header__navigation--count--style">
                    {likeItems.length}
                  </p>
                </div>
              )}
            </div>
          </NavLink>
          <NavLink
            to="/cart"
            className={({ isActive }) => (isActive ? 'header__activenav' : '')}
          >
            <div className="header__navigation--bag">
              {cartItems.length !== 0 && (
                <div className="header__navigation--count">
                  <p className="header__navigation--count--style">
                    {cartItems.length}
                  </p>
                </div>
              )}
            </div>
          </NavLink>
        </div>
      </header>

      <div className="availability">
        <h1 className="text">Welcome to Nice Gadgets store!</h1>

        <section className="slides slider-first">
          <Flickity
            className="slider"
            elementType="div"
            options={flickityOptions}
            reloadOnUpdate
          >
            {cars.id.map(index => (
              <Link
                to={paths[index - 1]}
                key={index}
                className="Plate"
                style={{ backgroundImage: `url(${cars.image[index - 1]})` }}
              ></Link>
            ))}
          </Flickity>
        </section>

        <section className="models">
          <h2 className="models__text">Brand new models</h2>
          <div className="slider-second">
            <Flickity
              className="slider"
              elementType="div"
              options={{
                pageDots: false,
                prevNextButtons: true,
                cellAlign: 'left',
              }}
            >
              {phones.map(item => {
                const isLiked = likeItems.some(phone => phone.id === item.id);
                const isCart = cartItems.some(phone => phone.id === item.id);

                if (item.ram === '6GB') {
                  return (
                    <div key={item.id} className="card">
                      <Link to={`/phones/${item.id}`} className="card__detail">
                        <img
                          src={item.images[0]}
                          alt="Phone image"
                          className="card__foto"
                        />
                      </Link>
                      <h2 className="card__text">{item.name}</h2>
                      <h3 className="card__price">{item.priceRegular + '$'}</h3>
                      <div className="card__hr"></div>
                      <div className="card__info">
                        <div className="card__info--block">
                          <p className="card__name">Screen</p>
                          <p className="card__data">
                            {item.screen.slice(0, 5)}
                          </p>
                        </div>
                        <div className="card__info--block">
                          <p className="card__name">Capacity</p>
                          <p className="card__data">{item.capacity}</p>
                        </div>
                        <div className="card__info--block">
                          <p className="card__name">RAM</p>
                          <p className="card__data">{item.ram}</p>
                        </div>
                      </div>

                      <div className="card__buttons">
                        <button
                          className={cn('card__buttons--add', {
                            'card__buttons--active': isCart,
                          })}
                          onClick={() => addCartItems(item)}
                        >
                          {isCart ? 'Added' : 'Add to cart'}
                        </button>
                        <button
                          className={cn('card__buttons--like', {
                            'card__buttons--like--active': isLiked,
                          })}
                          onClick={() => addFavouritesItems(item)}
                        >
                          <div
                            className={cn('card__buttons--foto', {
                              'card__buttons--foto--active': isLiked,
                            })}
                          ></div>
                        </button>
                      </div>
                    </div>
                  );
                } else {
                  return;
                }
              })}
            </Flickity>
          </div>
        </section>

        <section className="category">
          <h2 className="category__text">Shop by category</h2>

          <div className="category__block--first">
            <Link to="/phones" className="category__block--href">
              <div className="category__block--square category__block--square1">
                <div className="category__block--foto--phones"></div>
              </div>
              <h4 className="category__block--name">Mobile phones</h4>
              <p className="category__block--left">124 models</p>
            </Link>
          </div>

          <div className="category__block--second">
            <Link to="/tablets" className="category__block--href">
              <div className="category__block--square category__block--square2">
                <div className="category__block--foto--tablets"></div>
              </div>
              <h4 className="category__block--name">Tablets</h4>
              <p className="category__block--left">36 models</p>
            </Link>
          </div>

          <div className="category__block--third">
            <Link to="/accessories" className="category__block--href">
              <div className="category__block--square category__block--square3">
                <div className="category__block--foto--accessories"></div>
              </div>
              <h4 className="category__block--name">Accessories</h4>
              <p className="category__block--left">34 models</p>
            </Link>
          </div>
        </section>

        <section className="assortment">
          <h2 className="models__text">Hot prices</h2>
          <div className="slider-second">
            <Flickity
              className="slider"
              elementType="div"
              options={{
                pageDots: false,
                prevNextButtons: true,
                cellAlign: 'left',
              }}
            >
              {phones.map(item => {
                const isLiked = likeItems.some(phone => phone.id === item.id);
                const isCart = cartItems.some(phone => phone.id === item.id);

                return (
                  <div key={item.id} className="card">
                    <Link to={`/phones/${item.id}`} className="card__detail">
                      <img
                        src={item.images[0]}
                        alt="Phone image"
                        className="card__foto"
                      />
                    </Link>
                    <h2 className="card__text">{item.name}</h2>
                    <div className="card__block">
                      <h3 className="card__price">
                        {item.priceDiscount + '$'}
                      </h3>
                      <h3 className="card__fullprice">
                        {item.priceRegular + '$'}
                      </h3>
                    </div>
                    <div className="card__hr"></div>
                    <div className="card__info">
                      <div className="card__info--block">
                        <p className="card__name">Screen</p>
                        <p className="card__data">{item.screen.slice(0, 5)}</p>
                      </div>
                      <div className="card__info--block">
                        <p className="card__name">Capacity</p>
                        <p className="card__data">{item.capacity}</p>
                      </div>
                      <div className="card__info--block">
                        <p className="card__name">RAM</p>
                        <p className="card__data">{item.ram}</p>
                      </div>
                    </div>

                    <div className="card__buttons">
                      <button
                        className={cn('card__buttons--add', {
                          'card__buttons--active': isCart,
                        })}
                        onClick={() => addCartItems(item)}
                      >
                        {isCart ? 'Added' : 'Add to cart'}
                      </button>
                      <button
                        className={cn('card__buttons--like', {
                          'card__buttons--like--active': isLiked,
                        })}
                        onClick={() => addFavouritesItems(item)}
                      >
                        <div
                          className={cn('card__buttons--foto', {
                            'card__buttons--foto--active': isLiked,
                          })}
                        ></div>
                      </button>
                    </div>
                  </div>
                );
              })}
            </Flickity>
          </div>
        </section>
      </div>

      <footer className="footer">
        <div className="footer__block">
          <div className="footer__logo"></div>
          <ul className="footer__list">
            <li className="footer__item">
              <a href="https://github.com/FoReWwEr" className="footer__href">
                Github
              </a>
            </li>
            <li className="footer__item">
              <a href="mailto:ovoo1339@gmail.com" className="footer__href">
                Contacts
              </a>
            </li>
            <li className="footer__item">
              <a href="https://github.com/FoReWwEr" className="footer__href">
                rights
              </a>
            </li>
          </ul>

          <div className="footer__back">
            <a
              className="footer__href footer__href--flex"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              <p className="footer__back--text">Back to top</p>
              <button className="footer__back--button">
                <div className="footer__back--image"></div>
              </button>
            </a>
          </div>
        </div>
      </footer>
    </>
  );
};
