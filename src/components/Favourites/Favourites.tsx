import { useContext } from 'react';
import { ProductCard } from '../ProductCard/ProductCard';
import { StateContext } from '../../store/GlobalProvider';
import { NavigationPath } from '../NavigatiomPath/NavigationPath';
import { Loader } from '../Loader/Loader';
import { useLoader } from '../../utils/useLoader';

export const Favourites = () => {
  const { favourites } = useContext(StateContext);
  const loading = useLoader();

  return (
    <>
      <NavigationPath firstLvl={'Favourites'} />
      <section className="favourites">
        <h1 className="favourites__title">Favourites</h1>
        {loading ? (
          <Loader />
        ) : favourites.length > 0 ? (
          <>
            <p className="favourites__count">{`${favourites.length} item${favourites.length === 1 ? `` : `s`} `}</p>
            <div className="favourites__box">
              {favourites.map((fav, index) => (
                <ProductCard key={index} prod={fav} showDiscount={false} />
              ))}
            </div>
          </>
        ) : (
          <>
            <p className="favourites__count">{`${favourites.length} item${favourites.length === 1 ? `` : `s`} `}</p>
            <div className="favourites__dont-have-box">
              <h2 className="favourites__dont-have">
                You don&rsquo;t have favorites items
              </h2>
              <img
                src="img/product-not-found.png"
                alt="favourites is empty"
                className="favourites__dont-have-img"
              />
            </div>
          </>
        )}
      </section>
    </>
  );
};
