import { FC } from 'react';
import { IPhone } from '../../types';
import { PhoneItem } from '../PhoneItem';
import '../ProductsList/ProductsList.scss';
import './Favourites.scss';

type Props = {
  favouritesPhones: IPhone[];
};

export const Favourites: FC<Props> = ({ favouritesPhones }) => {
  return (
    <ul className="phoneList__grid favourites__items" data-cy="productList">
      {favouritesPhones.map((phone) => (
        <li className="phoneList__gridItem" key={phone.itemId}>
          <PhoneItem phone={phone} />
        </li>
      ))}
    </ul>
  );
};
