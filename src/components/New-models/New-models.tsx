import { useEffect, useState } from 'react';
import { Phone } from '../../types';
import './New-models.scss';
import { getNewModels } from '../../utils/api';
import { Card } from '../Card/Card';

export const NewModels: React.FC = () => {
  const [newModels, setNewModels] = useState<Phone[]>([]);

  useEffect(() => {
    getNewModels().then((models: Phone[]) =>
      setNewModels(
        models.sort((a: Phone, b: Phone) => b.priceRegular - a.priceRegular),
      ),
    );
  }, []);

  return (
    <div className="new-models__container">
      <div className="new-models__header">
        <h2 className="section__title">Brand new models</h2>
        <div className="new-models__nav-buttons">
          <button
            className="new-models__nav-button-left icon button"
            disabled
          ></button>
          <button className="new-models__nav-button-right icon button"></button>
        </div>
      </div>
      <ul className="phone-list">
        {newModels.map((phone: Phone) => (
          <li key={phone.id} className="phone-list__item">
            <Card item={phone} />
          </li>
        ))}
      </ul>
    </div>
  );
};
