import { CatalogItem } from '../CatalogItem/CatalogItem';
import { PhoneFromServer } from '../../types/Phone';
import './GadgetsList.scss';
import './GadgetsList__Phone.scss';
import './GadgetsList__Tablet.scss';

type Props = {
  phones: PhoneFromServer[];
};

export const GadgetsList: React.FC<Props> = ({ phones }) => {
  return (
    <ul className="catalog-grid">
      {phones.map((phone: PhoneFromServer) => (
        <li key={phone.id} className="catalog-grid__item grid-item">
          <CatalogItem phone={phone} />
        </li>
      ))}
    </ul>
  );
};
