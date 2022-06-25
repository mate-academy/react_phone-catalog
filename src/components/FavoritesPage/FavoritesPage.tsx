import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { CartItem } from '../../types';
import NoResults from '../NoResults/NoResults';
import './FavoritesPage.scss';

import ProductCart from '../ProductCart/ProductCart';
import { StateContext } from '../../StateProvider';

const FavoritesPage: React.FC = () => {
  const { favoriteItems, textInput } = useContext(StateContext);

  let visibleItems = [...favoriteItems];

  visibleItems = visibleItems.filter((item: CartItem) => {
    if (!textInput) {
      return true;
    }

    return item.product.name.includes(textInput);
  });

  if (favoriteItems.length === 0) {
    return (
      <NoResults link="favorites" title="Favourites" />
    );
  }

  return (
    <section className="favoritesPage container">
      <div className="favoritesPage__btn-wrap">
        <NavLink to="/home">
          <div className="favoritesPage__go-to-home" />
        </NavLink>

        <div className="favoritesPage__arrow" />
        <span className="favoritesPage__btn-text">
          favorite link
        </span>
      </div>

      <h2 className="favoritesPage__title">Favourites</h2>
      <h4 className="favoritesPage__subtitle">{`${favoriteItems.length} models`}</h4>

      {visibleItems.length === 0 ? (
        <NoResults link="favorites" title="title" />
      ) : (
        <ul className="favoritesPage__list">
          <TransitionGroup className="favoritesPage__list">
            {visibleItems.map((item: CartItem) => (
              <CSSTransition
                key={item.id}
                timeout={500}
                classNames="item"
              >
                <ProductCart item={item.product} key={item.id} />
              </CSSTransition>
            ))}
          </TransitionGroup>
        </ul>
      )}
    </section>
  );
};

export default FavoritesPage;
