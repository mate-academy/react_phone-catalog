import React, { useState, useEffect, FC, useMemo, MouseEvent } from 'react';
import { Link } from 'react-router-dom';
import { PHONES_URL } from '../api/constants';
import { Phone } from './Phone';
import { filterPhones } from '../api/helpers';
import { Basket } from './Basket';

interface Props {
  filter: string;
  sort: string;
}

export const PhonesCatalog: FC<Props> = ({ filter, sort }) => {
  const getLocalStorage = JSON.parse(localStorage.getItem('basket')!);
  const initialBasket = getLocalStorage ? [...getLocalStorage] : [];
  const [phones, setPhones] = useState<Phone[]>([]);
  const [basket, setBasket] = useState<Item[]>([...initialBasket]);
  const [isOpenedBasket, setisOpenedBasket] = useState(false);

  const addItemToBascket = (e: MouseEvent<HTMLButtonElement>, id: string) => {
    e.preventDefault();
    const itemIndex = basket.findIndex(phone => phone.id === id);

    if (itemIndex !== -1) {
      setBasket(prev => [...prev].map((item, index) => {
        if (index === itemIndex) {
          return {
            ...item,
            quantity: item.quantity + 1,
          };
        }

        return item;
      }));
    } else {
      setBasket([...basket, {
        id, quantity: 1, phone: `/phones/${id}`,
      }]);
    }
  };

  useEffect(() => {
    fetch(PHONES_URL)
      .then(async data => setPhones(await data.json()));
  }, []);

  useEffect(() => {
    window.localStorage.setItem('basket', JSON.stringify(basket));
  }, [basket]);

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

  const handleBasket = () => {
    setisOpenedBasket(prev => !prev);
  };

  const removeItem = (id: string): void => {
    setBasket([...basket.filter(item => item.id !== id)]);
  };

  const onIncrement = (id: string): void => {
    setBasket([...basket.map(item => {
      if (item.id === id) {
        return {
          ...item,
          quantity: item.quantity + 1,
        };
      }

      return item;
    })]);
  };

  const onDecrement = (id: string): void => {
    setBasket([...basket.map(item => {
      if (item.id === id) {
        return {
          ...item,
          quantity: item.quantity - 1,
        };
      }

      return item;
    })]);
  };

  return (
    <>
      <div>
        <button
          type="button"
          className="settings__basket"
          onClick={handleBasket}
        />
        {isOpenedBasket && (
          <Basket
            basket={basket}
            removeItem={removeItem}
            onIncrement={onIncrement}
            onDecrement={onDecrement}
          />
        )}
      </div>
      <ul className="phones__list">
        {phonesToShow.map(phone => (
          <li className="phones__item" key={phone.id}>
            <Link className="link" to={`/phones/${phone.id}`}>
              <Phone phone={phone} handleAdd={addItemToBascket} />
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
};
