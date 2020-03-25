import React, { useState, useEffect, FC, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { PHONES_URL } from '../api/constants';
import { Phone } from './Phone';

interface Props {
  filter: string;
  sort: string;
}

const filterPhones = (filter: string, phones: Phone[]): Phone[] => {
  const filterToLowerCase = filter.toLowerCase();

  return phones
    .filter(phone => phone.name.toLocaleLowerCase().includes(filterToLowerCase)
    || phone.snippet.toLocaleLowerCase().includes(filterToLowerCase));
};

export const PhonesCatalog: FC<Props> = ({ filter, sort }) => {
  const [phones, setPhones] = useState<Phone[]>([]);

  useEffect(() => {
    fetch(PHONES_URL)
      .then(async data => setPhones(await data.json()));
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
    <ul className="phones__list">
      {phonesToShow.map(phone => (
        <li className="phones__item" key={phone.id}>
          <Link className="link" to={`/phones/${phone.id}`}>
            <Phone {...phone} />
          </Link>
        </li>
      ))}
    </ul>
  );
};
