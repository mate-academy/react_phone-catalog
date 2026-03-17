import React, { useContext } from 'react';
import '../styles/style.scss';
import { FavouritesContext } from '../components/Context/FavouritesContext';
import { ProductCard } from '../components/ProductCard/ProductCard';
import { ProductCardItem } from '../types/CartItem';
import { CartsContext } from '../components/Context/CartsContext';
import { NavLink } from 'react-router-dom';
import { icons } from '../utils/icons';
import { images } from '../utils/images';

export const FavouritesPage = () => {
  const { favourites, setFavourites } = useContext(FavouritesContext);
  const { carts, setCarts } = useContext(CartsContext);

  const toggleCart = (item: ProductCardItem) => {
    setCarts(prev => {
      const exiting = prev.find(c => c.id === item.id);

      if (exiting) {
        return prev.filter(c => c.id !== item.id);
      }

      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const toggleFavourite = (item: ProductCardItem) => {
    setFavourites(prev =>
      prev.some(f => f.id === item.id)
        ? prev.filter(f => f.id !== item.id)
        : [...prev, item],
    );
  };

  if (favourites.length === 0) {
    return (
      <div className="page__notFound">
        <h1>Favourites is empty :&#40;</h1>
        <img src={images.Fovourites_empty} alt="favouritesempty" />
      </div>
    );
  }

  return (
    <>
      <div className="page page-favourites">
        <div className="page__top">
          <NavLink to="/" end className="logo logo--house">
            <img
              className="icon icon--house"
              src={icons.logoHouse}
              alt="Logo"
            />
          </NavLink>
          <div className="icon icon--arrow">
            <img src={icons.arrowIconLeft} alt="Logo arrow"></img>
          </div>
          <div className="page__top--title">{'Favourites'}</div>
        </div>
        <div className="page__title text-h1">{'Favourites'}</div>
        <p className="page__amount">{favourites.length} models</p>
        <div className="page__content">
          {favourites.map(item => (
            <ProductCard
              key={item.id}
              products={item}
              isFavourite={id => favourites.some(f => f.id === id)}
              isCarts={id => carts.some(c => c.id === id)}
              handleToggleFavourite={toggleFavourite}
              handleToggleCarts={toggleCart}
            />
          ))}
        </div>
      </div>
    </>
  );
};
