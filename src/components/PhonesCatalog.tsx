import React, { useEffect, FC, useMemo, MouseEvent } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Phone } from './Phone';
import { filterPhones } from '../api/helpers';
import { Basket } from './Basket';
import * as actions from '../redux/actions';
import { LoaderComponent } from './LoaderComponent';

interface Props {
  filter: string;
  sort: string;
  phones: Phone[];
  basket: Basket[];
  isLoading: boolean;
  isLoaded: boolean;
  likes: string[];
  loadPhones: () => void;
  setPhones: (phones: Phone[]) => void;
  setBasket: (basket: Basket[]) => void;
  setLikes: (likes: string[]) => void;
}

export const PhonesCatalogTemplate: FC<Props> = ({
  filter,
  sort,
  phones,
  basket,
  likes,
  isLoaded,
  isLoading,
  loadPhones,
  setPhones,
  setBasket,
  setLikes,
}) => {
  const addItemToBascket = (e: MouseEvent<HTMLButtonElement>, id: string) => {
    e.preventDefault();

    setBasket([...basket, {
      id, quantity: 1, phone: `/phones/${id}`,
    }]);
  };

  const addLike = (e: MouseEvent<HTMLButtonElement>, phoneId: string) => {
    e.preventDefault();
    const hasLike = likes.findIndex(item => item === phoneId);

    if (hasLike === -1) {
      setLikes([...likes, phoneId]);
    } else {
      setLikes([...likes.filter(item => item !== phoneId)]);
    }
  };

  useEffect(() => {
    loadPhones();
  }, []);

  useEffect(() => {
    switch (sort) {
      case 'age': {
        setPhones([...phones].sort((a, b) => a.age - b.age));
        break;
      }

      case 'name': {
        setPhones([...phones].sort((a, b) => a.name.localeCompare(b.name)));
        break;
      }

      default:
        setPhones(phones);
    }
  }, [sort]);

  const phonesToShow = useMemo(() => {
    if (!phones.length) {
      return [];
    }

    return filterPhones(filter, phones);
  }, [filter, phones]);

  return (
    <>
      <ul className="phones__list">
        {(isLoading) && <LoaderComponent /> }
        {(isLoaded) && phonesToShow.map(phone => (
          <li className="phones__item" key={phone.id}>
            <Link className="link" to={`/phones/${phone.id}`}>
              <Phone
                phone={phone}
                handleAdd={addItemToBascket}
                handleLikes={addLike}
                basket={basket}
                likes={likes}
              />
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
};

const mapStateToProps = (
  state: {
    catalogReducer: CatalogState;
    basketReducer: BasketState;
    loadReducer: LoadState;
    likesReducer: LikesState;
  },
) => ({
  likes: state.likesReducer.likes,
  phones: state.catalogReducer.phones,
  basket: state.basketReducer.basket,
  isLoaded: state.loadReducer.isLoaded,
  isLoading: state.loadReducer.isLoading,
});

const mapDispatchToProps = {
  loadPhones: actions.loadPhones,
  setPhones: actions.setPhones,
  setBasket: actions.setBasket,
  setLikes: actions.setLikes,
};

export const PhonesCatalog = connect(
  mapStateToProps,
  mapDispatchToProps,
)(PhonesCatalogTemplate);
