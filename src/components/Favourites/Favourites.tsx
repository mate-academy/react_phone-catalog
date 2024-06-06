import { FC } from 'react';
import { IPhone } from '../../types';
import { ProductItem } from '../ProductItem';
import '../ProductsList/ProductsList.scss';
import './Favourites.scss';

type Props = {
  favouritesProducts: IPhone[];
};

export const Favourites: FC<Props> = ({ favouritesProducts }) => {
  return (
    <ul className="phoneList__grid favourites__items" data-cy="productList">
      {favouritesProducts.map((product) => (
        <li className="phoneList__gridItem" key={product.itemId}>
          <ProductItem product={product} />
        </li>
      ))}
    </ul>
  );
};
