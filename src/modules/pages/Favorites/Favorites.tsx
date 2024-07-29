import { useContext } from 'react';
import './Favorites.scss';
import { Card } from '../Home/components/NewPhones/components';
import { PhoneContext } from '../../../PageContext';

export const Favorites = () => {
  const phones = useContext(PhoneContext);
  const currentPhones = phones.slice(0, 6);

  return (
    <div className="favorites-layout">
      <div>links</div>
      <h1 className="favorites-h1">Favourites</h1>
      <p className="favorites-p">5 items</p>
      <div className="phones-card-container card-container-block">
        {currentPhones.map(currentPhone => (
          <Card phone={currentPhone} key={currentPhone.id} />
        ))}
      </div>
    </div>
  );
};
