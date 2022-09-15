import { useEffect, useState } from 'react';
import { useAppSelector } from '../../app/hooks';
import { RootState } from '../../app/store';
import { Phone } from '../../types/Phone';
import { getPhones } from '../../utils/api';
import { Item } from '../Item';
import { Path } from '../Path';
import './Favourites.scss';

export const Favourites: React.FC = () => {
  const [favItems, setFavItems] = useState<Phone[]>([]);

  const title = () => {
    const paths = window.location.pathname.split('/');
    const titlePrepared = paths[paths.length - 1];

    return titlePrepared[0].toUpperCase() + titlePrepared.slice(1);
  };

  const favourites = useAppSelector((state: RootState) => (
    state.favorite.favorites
  ));

  useEffect(() => {
    getPhones().then((phones: Phone[]) => {
      favourites.forEach(item => {
        const currPhone = phones.find(phone => phone.id === item);

        if (currPhone) {
          setFavItems((curr) => [...curr, currPhone]);
        }
      });
    });
  }, [favourites]);

  return (
    <section className="favourites">
      <Path pathElems={[title()]} pathBoldElems={[]} />
      <h1 className="favourites__title">
        {title()}
      </h1>

      <h3 className="favourites__subtitle">
        {`${favourites.length} items`}
      </h3>

      <div className="favourites__body">
        {favItems.map(item => <Item item={item} key={item.id} />)}
      </div>
    </section>
  );
};
