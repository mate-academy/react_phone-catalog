import React, { useState } from 'react';
import { Header } from '../Header/header';
import { useCart } from '../../Context/Context';
import { useFav } from '../../Context/FavouritesContext';
import { Footer } from '../Footer/Footer';
import ArrowGray from '../../images/icons/ChevronGray.svg';
import Home from '../../images/icons/Home.svg';
import './Favourites.scss';
import { Link } from 'react-router-dom';
import { ProductCard } from '../ProductCard/ProductCard';
import { Aside } from '../Aside/Aside';

export const Favourites = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { totalQuantity } = useCart();
  const { totalFavourites, items = [] } = useFav();

  return (
    <div className="favourites">
      <div className="favourites__header">
        <Header
          cartItemsCount={totalQuantity}
          favouritesCount={totalFavourites}
          setMenuOpen={setMenuOpen}
        />
        {menuOpen && <Aside setMenuOpen={setMenuOpen} />}
      </div>
      <div className="favourites__content">
        <div className="favourites__path">
          <Link to="/">
            <img src={Home} alt="" />
          </Link>
          <img src={ArrowGray} alt="" />
          <span className="favourites__path-name">Favourites</span>
        </div>
        <div className="aside__title">Favourites</div>
        <div className="favourites__sub">{totalFavourites} items</div>
        <div className="favourites__items">
          {totalFavourites === 0 && (
            <span className="favourites__items-empty">
              Your favourites list is empty
            </span>
          )}
          <div className="page__models-phones phones__grid">
            {items.map(item => (
              <Link
                to={`/${item.product.category}/${item.product.id}`}
                key={item.product.id}
                className="page__models-phone"
              >
                <div className="page__models-container">
                  <div className="page__models-img">
                    <img
                      src={item.product.image}
                      alt=""
                      className="page__models-image"
                    />
                  </div>
                  <p className="page__models-title">{item.product.name}</p>
                  <span className="page__models-price">
                    {item.product.fullPrice}$
                  </span>
                  <div className="page__models-string"></div>
                  <div className="page__models-info">
                    <p className="page__models-text page__models-text__first">
                      Screen{' '}
                      <span className="page__models-span">
                        {item.product.screen}
                      </span>
                    </p>
                    <p className="page__models-text">
                      Capacity{' '}
                      <span className="page__models-span">
                        {item.product.capacity}
                      </span>
                    </p>
                    <p className="page__models-text">
                      RAM{' '}
                      <span className="page__models-span">
                        {item.product.ram}
                      </span>
                    </p>
                  </div>
                  <ProductCard product={item.product} />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
      <div className="favourites__footer">
        <Footer />
      </div>
    </div>
  );
};
