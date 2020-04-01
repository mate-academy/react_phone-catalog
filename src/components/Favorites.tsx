import React, { FC } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Phone } from './Phone';
import * as actions from '../redux/actions';

interface Props {
    phones: Phone[];
    basket: Basket[];
    likes: string[];
    setPhones: (phones: Phone[]) => void;
    setBasket: (basket: Basket[]) => void;
    setLikes: (likes: string[]) => void;
  }

export const FavoritesTemplate: FC<Props> = ({
  phones,
  basket,
  likes,
}) => {
  return (
    <div className="favorites" id="header">
      <h2 className="favorites__header">Favorites</h2>
      {(likes.length > 0) && (
        <p className="favorites__number">
          {likes.length}
          {' '}
          models
        </p>
      )}

      {(likes.length > 0) ? (
        <div className="favorites__collection">
          {phones.filter(item => likes.includes(item.id)).map(phone => (
            <li className="phones__item" key={phone.id}>
              <Link className="link" to={`/phones/${phone.id}`}>
                <Phone
                  phone={phone}
                  basket={basket}
                  likes={likes}
                />
              </Link>
            </li>
          ))}
        </div>
      ) : (
        <p className="favorites__not-found">
            You didn&apos;t choose favorite models
        </p>
      )}

    </div>
  );
};

const mapStateToProps = (
  state: {
      catalogReducer: CatalogState;
      basketReducer: BasketState;
      likesReducer: LikesState;
    },
) => ({
  likes: state.likesReducer.likes,
  phones: state.catalogReducer.phones,
  basket: state.basketReducer.basket,
});

const mapDispatchToProps = {
  setPhones: actions.setPhones,
  setBasket: actions.setBasket,
  setLikes: actions.setLikes,
};

export const Favorites = connect(
  mapStateToProps,
  mapDispatchToProps,
)(FavoritesTemplate);
