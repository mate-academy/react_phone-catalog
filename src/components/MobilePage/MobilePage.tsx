import { Link, NavLink, useLocation } from 'react-router-dom';
import './MobilePage.scss';
import { SetStateAction, useEffect, useState } from 'react';
import phones from '../../api/phones.json';
import cn from 'classnames';
import { CardPhone } from '../../cardPhone';

interface Props {
  likeItems: CardPhone[];
  addFavouritesItems: (b: CardPhone) => void;
  addCartItems: (a: CardPhone) => void;
  cartItems: CardPhone[];
  totalItems: number;
}

export const MobilePage = ({
  likeItems,
  addFavouritesItems,
  addCartItems,
  cartItems,
  totalItems,
}: Props) => {
  const [elements, setElements] = useState('8');
  const [currentPage, setCurrentPage] = useState(0);
  const [gadgets, setGadgets] = useState(phones);
  const [sorting, setSorting] = useState('Alphabetically');

  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [pathname]);

  useEffect(() => {
    const sortedPhones = [...phones];

    switch (sorting) {
      case 'Alphabetically':
        sortedPhones.sort((item1, item2) =>
          item1.name.localeCompare(item2.name),
        );
        break;
      case 'Expensive':
        sortedPhones.sort(
          (item1, item2) => item2.priceDiscount - item1.priceDiscount,
        );
        break;
      case 'Cheapest':
        sortedPhones.sort(
          (item1, item2) => item1.priceDiscount - item2.priceDiscount,
        );
        break;
    }

    setGadgets(sortedPhones);
  }, [sorting]);

  const totalPages =
    elements === 'all' ? 1 : Math.ceil(phones.length / +elements);

  function handleItemsPerPageChange(event: { target: { value: string } }) {
    const value = event.target.value;

    setElements(value);
    setCurrentPage(0);
  }

  const handlePageChange = (pageIndex: SetStateAction<number>) => {
    setCurrentPage(pageIndex);
  };

  const visiblePages = Array.from({ length: totalPages }, (_, i) => i).slice(
    Math.max(0, Math.min(totalPages - 4, currentPage - 2)),
    Math.min(totalPages, Math.max(4, currentPage + 2)),
  );

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const start = currentPage * +elements;
  const end = elements === 'all' ? phones.length : start + +elements;
  const visibleCards = gadgets.slice(start, end);

  return (
    <>
      <header className="header">
        <div className="header__navlist">
          <div className="header--logo"></div>
          <ul className="header__list">
            <li className="header__item">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive ? 'header__active' : 'header__href'
                }
              >
                home
              </NavLink>
            </li>
            <li className="header__item">
              <NavLink
                to="/phones"
                className={({ isActive }) =>
                  isActive ? 'header__active' : 'header__href'
                }
              >
                phones
              </NavLink>
            </li>
            <li className="header__item">
              <NavLink
                to="/tablets"
                className={({ isActive }) =>
                  isActive ? 'header__active' : 'header__href'
                }
              >
                tablets
              </NavLink>
            </li>
            <li className="header__item">
              <NavLink
                to="/accessories"
                className={({ isActive }) =>
                  isActive ? 'header__active' : 'header__href'
                }
              >
                accessories
              </NavLink>
            </li>
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
                    {totalItems}
                  </p>
                </div>
              )}
            </div>
          </NavLink>
        </div>
      </header>

      <div className="availability">
        <main className="functional">
          <section className="navigate">
            <Link to="/" className="navigate__href">
              <div className="navigate__house"></div>
            </Link>
            <div className="navigate__arrow"></div>
            <p className="navigate__text">Phones</p>
          </section>

          <h1 className="functional__text">Mobile phones</h1>
          <p className="functional__models">124 models</p>

          <section className="sorting">
            <div className="sorting__block">
              <p className="sorting__block--text">Sort by</p>
              <div className="sorting__wrapped">
                <select
                  className="sorting__select"
                  value={sorting}
                  onChange={event => setSorting(event.target.value)}
                >
                  <option value="Alphabetically">Alphabetically</option>
                  <option value="Expensive">Expensive</option>
                  <option value="Cheapest">Cheapest</option>
                </select>
                <div className="sorting__icon"></div>
              </div>
            </div>
            <div className="sorting__block">
              <p className="sorting__block--text">Items on page</p>
              <div className="sorting__wrapped">
                <select
                  className="sorting__select"
                  value={elements}
                  onChange={handleItemsPerPageChange}
                >
                  <option value="8">8</option>
                  <option value="16">16</option>
                  <option value="32">32</option>
                  <option value="all">All</option>
                </select>
                <div className="sorting__icon"></div>
              </div>
            </div>
          </section>

          <section className="mobiles">
            <div className="cardsContainer">
              {visibleCards.map(item => {
                const isLiked = likeItems.some(phone => phone.id === item.id);
                const isCart = cartItems.some(phone => phone.id === item.id);

                return (
                  <div key={item.id} className="card mobiles__card">
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
                        className={cn(
                          'card__buttons--add mobiles__button--add',
                          { 'card__buttons--active': isCart },
                        )}
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
            </div>

            {elements !== 'all' && (
              <div className="mobiles__tabsContainer">
                <button
                  className={cn('mobiles__tab', {
                    'mobiles__tab--disabled': currentPage === 0,
                  })}
                  onClick={handlePrevPage}
                  disabled={currentPage === 0}
                >
                  <div className="mobiles__arrow mobiles__arrow--left"></div>
                </button>
                {visiblePages.map(page => (
                  <div className="mobiles__block" key={page}>
                    <button
                      className={`mobiles__button ${page === currentPage && 'mobiles__button--active'}`}
                      onClick={() => handlePageChange(page)}
                    >
                      {page + 1}
                    </button>
                  </div>
                ))}
                <button
                  className="mobiles__tab"
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages - 1}
                >
                  <div className="mobiles__arrow mobiles__arrow--right"></div>
                </button>
              </div>
            )}
          </section>
        </main>
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
