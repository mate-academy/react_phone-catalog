import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../style/main.scss';
import { client } from '../utils/fetchClient';
import { Phone } from '../Type/Phone';
import { Dropdowns } from '../Components/Dropdowns';

export const PhonesPage: React.FC = () => {
  const [phones, setPhones] = useState<Phone[]>([]);

  useEffect(() => {
    client.get<Phone[]>('/_new/products.json')
      .then(setPhones);
  }, []);

  return (
    <main>
      <div className="phones">
        <div className="breadcrumbs">
          <Link
            to="/"
            className="breadcrumbs__button breadcrumbs__icon"
          />
          <div className="breadcrumbs__arrow breadcrumbs__icon" />
          <p>
            Phones
          </p>
        </div>
        <div className="title">
          <h1>Mobile phones</h1>

          <p className="title__p">{`${phones.length} models`}</p>
        </div>
        <Dropdowns />
      </div>
    </main>
  );
};
