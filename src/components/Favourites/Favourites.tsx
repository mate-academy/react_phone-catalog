import { useContext } from 'react';
import { ProductCard } from '../ProductCard/ProductCard';
import { StateContext } from '../../store/GlobalProvider';
import { NavigationPath } from '../NavigatiomPath/NavigationPath';

export const Favourites = () => {
  const { favourites } = useContext(StateContext);

  return (
    <>
      <NavigationPath firstLvl={'Favourites'} />
      <section className="favourites">
        <h1 className="favourites__title">Favourites</h1>
        <p className="favourites__count">{`${favourites.length} item${favourites.length === 1 ? `` : `s`} `}</p>
        <div className="favourites__container">
          <div className="favourites__box">
            {favourites.map((fav, index) => (
              <ProductCard prod={fav} key={index} showDiscount={false} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};
