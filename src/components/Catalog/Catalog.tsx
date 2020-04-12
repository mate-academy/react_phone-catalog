import React, { FC } from 'react';
import './_Catalog.scss';
import { PhoneInterface } from '../../constants/types';
import { PhoneThumb } from '../PhoneThumb';

interface Props {
  phonesArray: PhoneInterface[];
}

export const Catalog: FC<Props> = (props) => {
  const { phonesArray } = props;

  return (
    <ul className="catalog">
      {phonesArray.map((phone: PhoneInterface) => (
        <li
          className="catalog__item phoneThumb"
          key={phone.id}
        >
          <PhoneThumb
            data={phone}
          />
        </li>
      ))}
    </ul>
  );
};
