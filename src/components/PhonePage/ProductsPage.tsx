/* eslint-disable no-console */
import React, { useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink, useHistory, useLocation } from 'react-router-dom';
import { getPhones } from '../../store/index';
import { Phone } from '../../interfaces';
import { AddButton } from '../AddButton';
import { Price } from '../Price';
import { Options } from '../Options';

interface Props {
  info: string;
  description: string;
}

// type SortedList = {
//   [key in string]: keyof Phone;
// };

export const PhonesPage: React.FC<Props> = () => {
  const products: Phone[] = useSelector(getPhones);
  const phones = products.filter(product => product.type === 'phone');
  const [sortedList, setSortedList] = useState<Phone[]>(phones);
  const history = useHistory();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const sortByOption: string = searchParams.get('sortBy') || '';
  const perPage: string = searchParams.get('perPage') || '';
  const page: string = searchParams.get('page') || '';
  console.log(perPage, page)
  const setParams = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.currentTarget;

    searchParams.set('sortBy', `${value}`);

    history.push({
      search: searchParams.toString(),
    });
  };

  useMemo(() => {
    let sorted: Phone[];

    switch (sortByOption) {
      case 'price':
        sorted = [...phones].sort((a, b) => a[sortByOption] - b[sortByOption]);
        setSortedList(sorted);
        break;

      case 'name':
        sorted = [...phones].sort((a, b) => a[sortByOption].localeCompare(b[sortByOption]));
        setSortedList(sorted);
        break;

      default:
    }
  }, [sortByOption, products]);

  return (
    <section className="phones">
      <h2 className="title">
        Mobile phones
      </h2>
      <p className="phones__number">{`${phones.length} models`}</p>
      <div className="phones__sorting">
        <div className="phones__wrapper">
          <p className="phones__sort-name">Sort by</p>
          <select
            value={sortByOption}
            onChange={setParams}
            className="phones__sort"
            name="sort-by"
            id="sort-by"
          >
            <option value="name">Name</option>
            <option value="price">Price</option>
          </select>
        </div>
        <div className="phones__wrapper">
          <p className="phones__sort-name">Items on page</p>
          <select className="phones__sort" name="items-per-page" id="items-per-page">
            <option value="10">10</option>
            <option value="15">15</option>
          </select>
        </div>
      </div>
      <ul className="phones__list">
        {
          sortedList.map(phone => {
            const generalDetails = [
              { title: 'Screen', option: phone.screen },
              { title: 'Ram', option: phone.ram },
              { title: 'Capacity', option: phone.capacity },
            ];

            return (
              <li className="carousel__item card">
                <img className="card__img" src={phone.imageUrl} alt={phone.name} />
                <NavLink to={`phones/${phone.id}`}>
                  <h3 className="card__title">
                    {phone.name}
                    {phone.capacity}
                  </h3>
                </NavLink>
                <Price price={phone.price} discount={phone.discount} />
                <div className="card__details details">
                  <Options optionsList={generalDetails} />
                </div>
                <div className="card__button">
                  <AddButton goodItem={phone} />
                </div>
              </li>
            );
          })
        }
      </ul>
    </section>
  );
};
