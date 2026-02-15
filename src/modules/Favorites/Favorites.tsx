import { Breadcrumbs } from '../../components/Breadcrumbs/Breadcrumbs';
import './Favorites.scss';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { ProductCard } from '../../components/ProductCard';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export const Favorites = () => {
  const favorites = useSelector((state: RootState) => state.favorites);
  const [showGoBtn, setShowGoBtn] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (favorites.length === 0) {
      const timer = setTimeout(() => {
        setShowGoBtn(true);
      }, 1500);

      return () => clearTimeout(timer);
    } else {
      setShowGoBtn(false);
    }
  }, [favorites]);

  return (
    <div className="favorites">
      <div className="favorites__container">
        <Breadcrumbs />
        {favorites.length > 0 ? (
          <>
            <h1 className="favorites__title title">Favourites</h1>

            <div className="products__cards cards">
              <div className="favourites__count">{favorites.length} Items</div>

              <ul className="cards__list">
                {favorites.map((product, index) => (
                  <li className="cards__item" key={index}>
                    <ProductCard product={product} />
                  </li>
                ))}
              </ul>
            </div>
          </>
        ) : (
          <>
            <div className="favourites__empty">
              <Link
                to="/"
                className={`no-items__btn ${showGoBtn ? 'no-items__btn--visible' : 'no-items__btn--hidden'}`}
              >
                Go shopping!
              </Link>
              <img src="./img/no-favourites.png" alt="" />
            </div>
          </>
        )}
      </div>
    </div>
  );
};
