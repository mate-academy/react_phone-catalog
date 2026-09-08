/* eslint-disable @typescript-eslint/no-unused-expressions */
import './Gadgets.scss';
import './UnderNav.scss';
import '../App.scss';
import Home from '../img/Home.svg';
import FavoriteAdd from '../img/Favorite-add.svg';
import accessories from '../../public/api/accessories.json';
import FavoriteAddActive from '../img/Favorite-add-active.svg';
import { Link, useLocation } from 'react-router-dom';
import { CartContext, FavoritesContext } from './AppProvaider';
import { useContext, useEffect, useState } from 'react';
import { CartContextType, Product, FavoritesContextType } from './types';
import classNames from 'classnames';

export const AccessoriesPage = () => {
  const products: Product[] = accessories;
  const { pathname } = useLocation();
  const cartContext = useContext<CartContextType>(CartContext);
  const favoritesContext = useContext<FavoritesContextType>(FavoritesContext);
  const [sortBy, setSortBy] = useState('newest');
  const [itemsToLoad, setItemsToLoad] = useState('4');
  const [filteredProducts, setFilteredProducts] = useState([...products]);
  const [productsToLoad, setProductsToLoad] = useState([...products]);
  const [pageCount, setPageCount] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);

  useEffect(() => {
    if (sortBy === `newest`) {
      setFilteredProducts([...products].reverse());
    } else if (sortBy === `alphabetically`) {
      setFilteredProducts([...products].sort());
    } else if (sortBy === `cheapest`) {
      setFilteredProducts(
        [...products].sort((a, b) => a.priceDiscount - b.priceDiscount),
      );
    }

    if (pageNumber === 1) {
      if (itemsToLoad === `all`) {
        setProductsToLoad([...filteredProducts]);
        setPageCount(1);
      } else if (itemsToLoad === `8`) {
        setProductsToLoad([...filteredProducts].slice(0, 8));
      } else if (itemsToLoad === `16`) {
        setProductsToLoad([...filteredProducts].slice(0, 16));
      } else if (itemsToLoad === `4`) {
        setProductsToLoad([...filteredProducts].slice(0, 4));
      }
    } else {
      setProductsToLoad(
        [...filteredProducts].slice(
          1 * +itemsToLoad * pageNumber - +itemsToLoad,
          1 * +itemsToLoad * pageNumber,
        ),
      );
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    itemsToLoad !== 'all' &&
      setPageCount(Math.round(products.length / +itemsToLoad));
  }, [sortBy, itemsToLoad, filteredProducts, pageNumber, pageCount]);

  if (!cartContext) {
    throw new Error('CartContext должен использоваться внутри провайдера');
  }

  const { addToCart, removeFromCart, cartInclude } = cartContext;
  const { addToFavorites, removeFromFavorites, favoritesInclude } =
    favoritesContext;

  return (
    <>
      {pathname.startsWith('/accessories') && (
        <div className="under-nav">
          <div className="under-nav__back">
            <a href="/">
              <img src={Home} alt="home" />
            </a>
            <div className="under-nav__back__text">{` > Accessories`}</div>
          </div>
          <h1 className="under-nav__h1">Accessories</h1>
          <div className="under-nav__models-count">{`${products.length} models`}</div>

          <div className="under-nav__select-box greyText">
            <div className="under-nav__select__text-box">
              <div className="under-nav__select__text">Sort by</div>
              <div className="under-nav__select__text">Items on page</div>
            </div>
            <div className="under-nav__select__box">
              <select
                name="select"
                className="under-nav__sort-by under-nav__select"
                value={sortBy}
                onChange={e => {
                  setSortBy(e.target.value);
                  setPageNumber(1);
                }}
              >
                <option value="newest">Newest</option>
                <option value="alphabetically">Alphabetically</option>
                <option value="cheapest">Cheapest</option>
              </select>
              <select
                value={itemsToLoad}
                onChange={e => {
                  setItemsToLoad(e.target.value);
                  setPageNumber(1);
                }}
                name="select"
                className="under-nav__items-on-page under-nav__select"
              >
                <option value="4">4</option>
                <option value="8">8</option>
                <option value="16">16</option>
                <option value="all">All</option>
              </select>
            </div>
          </div>
        </div>
      )}
      <div className="phone-list">
        {productsToLoad.map(product => (
          <div className="card" key={product.id}>
            <div className="card__content">
              <Link to={`/product/${product.id}`}>
                <img
                  className="card__img"
                  src={product.images[0]}
                  alt={product.id}
                />
              </Link>
              <div className="card__main-text">{product.name}</div>
              <div className="card__price">
                <div className="card__price__discount">
                  {`$${product.priceDiscount}`}
                </div>
                <div className="card__price__regular">{`$${product.priceRegular}`}</div>
              </div>
              <div className="card__specs">
                <div className="card__specs__string">
                  Screen
                  <div className="card__specs__string__value">
                    {product.screen}
                  </div>
                </div>
                <div className="card__specs__string">
                  Capacity
                  <div className="card__specs__string__value">
                    {product.capacity}
                  </div>
                </div>
                <div className="card__specs__string">
                  RAM
                  <div className="card__specs__string__value">
                    {product.ram}
                  </div>
                </div>
              </div>
              <div className="card__buttons">
                <button
                  className={classNames('card__buttons__add button__add', {
                    button__add__active: cartInclude(product),
                  })}
                  onClick={() => {
                    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
                    cartInclude(product)
                      ? removeFromCart(product)
                      : addToCart(product);
                  }}
                >
                  {cartInclude(product) ? 'Remove from cart' : 'Add to cart'}
                </button>
                <img
                  className="card__buttons__favorite button__favorite"
                  onClick={() => {
                    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
                    favoritesInclude(product)
                      ? removeFromFavorites(product.id)
                      : addToFavorites(product);
                  }}
                  src={
                    favoritesInclude(product) ? FavoriteAddActive : FavoriteAdd
                  }
                  alt=""
                />
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="page-selector">
        <div className="page-selector__buttons">
          <button
            className="page-selector__button"
            disabled={pageNumber === 1}
            onClick={() => setPageNumber(pageNumber - 1)}
          >
            {'<'}
          </button>
          {pageCount >= 1 && (
            <button
              className={classNames('page-selector__button', {
                'page-selector__button__active': pageNumber === 1,
              })}
              onClick={() => {
                pageNumber <= 2
                  ? setPageNumber(1)
                  : setPageNumber(pageNumber - 2);
              }}
            >
              {pageNumber <= 2 ? 1 : pageNumber - 2}
            </button>
          )}
          {pageCount >= 2 && (
            <button
              className={classNames('page-selector__button', {
                'page-selector__button__active': pageNumber === 2,
              })}
              onClick={() => {
                pageNumber <= 2
                  ? setPageNumber(2)
                  : setPageNumber(pageNumber - 1);
              }}
            >
              {pageNumber <= 2 ? 2 : pageNumber - 1}
            </button>
          )}
          {pageCount >= 3 && (
            <button
              className={classNames('page-selector__button', {
                'page-selector__button__active': pageNumber >= 3,
              })}
              onClick={() => {
                pageNumber <= 2 ? setPageNumber(3) : setPageNumber(pageNumber);
              }}
            >
              {pageNumber <= 2 ? 3 : pageNumber}
            </button>
          )}
          {pageCount >= pageNumber + 1 && pageCount > 2 && (
            <button
              className={classNames('page-selector__button', {})}
              onClick={() => {
                pageNumber <= 2
                  ? setPageNumber(4)
                  : setPageNumber(pageNumber + 1);
              }}
            >
              {pageNumber <= 2 ? 4 : pageNumber + 1}
            </button>
          )}
          {pageCount >= pageNumber + 2 && pageCount > 2 && (
            <button
              className={classNames('page-selector__button', {})}
              onClick={() => {
                pageNumber <= 2
                  ? setPageNumber(5)
                  : setPageNumber(pageNumber + 2);
              }}
            >
              {pageNumber <= 2 ? 5 : pageNumber + 2}
            </button>
          )}
          <button
            className="page-selector__button"
            disabled={pageNumber === pageCount}
            onClick={() => setPageNumber(pageNumber + 1)}
          >
            {'>'}
          </button>
        </div>
      </div>
    </>
  );
};
