import { Phone } from '../../types/Phone';
import { CatalogItem } from '../CatalogItem/CatalogItem';

type Props = {
  phones: Phone[];
};

export const ProductsList: React.FC<Props> = ({ phones }) => {
  return (
    <ul className="catalog-grid" data-cy="productList">
      {phones.map(phone => {
        return (
          <li className="catalog-grid__cell" key={phone.id}>
            <CatalogItem phone={phone} />
          </li>
        );
      })}
    </ul>
  );
};
