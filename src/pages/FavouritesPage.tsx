import {
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { getPhonesList } from '../api';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { ProductCard } from '../components/ProductCard';
import { ProductsContext } from '../context/ProductsContext';
import { Phone } from '../types/Phone';

export const FavouritesPage: React.FC = () => {
  const [phones, setPhones] = useState<Phone[]>([]);
  const { favouritesList } = useContext(ProductsContext);

  useEffect(() => {
    getPhonesList()
      .then(resolve => setPhones(resolve));
  }, []);

  const favouritesPhones = useMemo(() => {
    return phones.filter(phone => favouritesList.includes(phone.id));
  }, [favouritesList]);

  return (
    <div className="favourites-page">
      <Breadcrumbs />
      <h1 className="favourites-page__title">
        Favourites
      </h1>
      <div className="favourites-page__quantity">
        {`${favouritesPhones.length} items`}
      </div>
      <ul className="favourites-page__list">
        {favouritesPhones.map(phone => (
          <li key={phone.id}>
            <ProductCard phone={phone} />
          </li>
        ))}
      </ul>
    </div>
  );
};
