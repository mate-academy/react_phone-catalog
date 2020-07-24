/* eslint-disable no-console */
import React, { useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink, useHistory, useLocation } from 'react-router-dom';
import { getPhones } from '../../store/index';
import { Phone } from '../../interfaces';
import { AddButton } from '../AddButton';
import { Price } from '../Price';
import { Options } from '../Options';
import { Pages } from './Pages';

interface Props {
  info: string;
  description: string;
}

export const ProductsPage: React.FC<Props> = () => {
  const products: Phone[] = useSelector(getPhones);
  const phones = products.filter(product => product.type === 'phone');
  const [sortedList, setSortedList] = useState<Phone[]>(phones);
  const history = useHistory();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const sortByOption: string = searchParams.get('sortBy') || '';
  const perPage: string = searchParams.get('perPage') || '';
  const page: string = searchParams.get('page') || '';
  const [startIndex, setStartIndex] = useState(1);
  const [lastIndex, setLastIndex] = useState(products.length);

  const setParams = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.currentTarget;

    searchParams.set('sortBy', `${value}`);
    history.push({
      search: searchParams.toString(),
    });
  };

  const setPerPage = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.currentTarget;

    searchParams.set('perPage', `${value}`);
    history.push({
      search: searchParams.toString(),
    });
  };

  const setPage = (value: string) => {
    searchParams.set('page', `${value}`);
    history.push({
      search: searchParams.toString(),
    });
  };

  useMemo(() => {
    let sorted: Phone[];
    const tempPage = page ? +page : 1;
    const index = +perPage * (tempPage - 1);
    const tempLastIndex = (index + +perPage) > products.length
      ? products.length
      : (index + +perPage);

    setStartIndex(index);
    setLastIndex(tempLastIndex);

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
  }, [sortByOption, products, page, perPage]);

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
          <select
            value={perPage}
            className="phones__sort"
            name="items-per-page"
            id="items-per-page"
            onChange={setPerPage}
          >
            <option value="4">4</option>
            <option value="8">8</option>
            <option value="12">12</option>
          </select>
        </div>
      </div>
      <ul className="phones__list">
        {
          sortedList.slice(startIndex, lastIndex).map(phone => {
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
      <Pages page={page} setPage={setPage} length={phones.length} perPage={perPage} />
    </section>
  );
};
