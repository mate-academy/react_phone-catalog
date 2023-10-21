import { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Phones } from '../../Components/Phones';
import { RootState } from '../../redux/store';
import { SearchContext } from '../../variables/contexts';
import './Favourites.scss';

export const Favourites = () => {
  const itemsInFavorite
    = useSelector((state: RootState) => state.favorite.itemInFavorite);
  const {
    setSearchVisible,
    setPlaceholder,
    appliedQuery,
    setAppliedQuery,
    setQuery,
  } = useContext(SearchContext);

  useEffect(() => {
    setSearchVisible(true);
    setPlaceholder('Search in favourites...');
    setQuery('');
    setAppliedQuery('');
  }, []);

  useEffect(() => {
    const clearQuery = appliedQuery.toLowerCase().trim();

    setAppliedQuery(clearQuery);
  }, [appliedQuery]);

  const visiblePhones = itemsInFavorite.filter(({ color, capacity, name }) => (
    name.toLowerCase().trim().includes(appliedQuery)
    || color.toLowerCase().trim().includes(appliedQuery)
    || capacity.toLowerCase().trim().includes(appliedQuery)
  ));

  return (
    <main className="main page__main">
      <div className="container">
        <div className="favorite__root-box">
          <Link
            to="/"
          >
            <img
              src="img/Icons/home.svg"
              alt="toHome"
              className="favorite__home-img"
            />
          </Link>
          <img
            src="img/Icons/arr-right-hover.svg"
            alt="arr-right"
            className="favorite__arr-right"
          />
          <Link
            to="/"
            className="favorite__root-name"
          >
            Home
          </Link>
        </div>
        <h1 className="favorite__title">Favourites</h1>
        {itemsInFavorite.length ? (
          <div className="favorite__cataloge">
            {visiblePhones.length ? (
              <ul className="grid">
                <Phones data-cy="cardsContainer" products={visiblePhones} />
              </ul>
            ) : (
              <div className="favorite__empty-box">
                <p
                  className="favorite__text-empty"
                >
                  NOTHING MATCHES YOUR SEARCH
                </p>
                <p className="favorite__text-less">
                  But do not give up,
                  check the spelling or try less specific search terms.
                </p>
              </div>
            )}
          </div>
        ) : (
          <div className="favorite__wrap-empty">
            <p
              className="favorite__text-empty"
            >
              Your Favorites List is empty,
              come back here when you add some items
            </p>
            <div className="favorite__img-empty" />
          </div>
        )}
      </div>
    </main>
  );
};
