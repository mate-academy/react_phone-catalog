import React, { useEffect, FC, useMemo, MouseEvent } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Phone } from './Phone';
import { filterPhones } from '../api/helpers';
import { Basket } from './Basket';
import * as actions from '../redux/actions';

interface Props {
  filter: string;
  sort: string;
  phones: Phone[];
  basket: Basket[];
  loadPhones: () => void;
  setPhones: (phones: Phone[]) => void;
  setBasket: (basket: Basket[]) => void;
}

export const PhonesCatalogTemplate: FC<Props> = ({
  filter,
  sort,
  phones,
  basket,
  loadPhones,
  setPhones,
  setBasket,
}) => {
  const addItemToBascket = (e: MouseEvent<HTMLButtonElement>, id: string) => {
    e.preventDefault();

    setBasket([...basket, {
      id, quantity: 1, phone: `/phones/${id}`,
    }]);
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
        {phonesToShow.map(phone => (
          <li className="phones__item" key={phone.id}>
            <Link className="link" to={`/phones/${phone.id}`}>
              <Phone
                phone={phone}
                handleAdd={addItemToBascket}
                basket={basket}
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
  },
) => ({
  phones: state.catalogReducer.phones,
  basket: state.basketReducer.basket,
});

const mapDispatchToProps = {
  loadPhones: actions.loadPhones,
  setPhones: actions.setPhones,
  setBasket: actions.setBasket,
};

export const PhonesCatalog = connect(
  mapStateToProps,
  mapDispatchToProps,
)(PhonesCatalogTemplate);
