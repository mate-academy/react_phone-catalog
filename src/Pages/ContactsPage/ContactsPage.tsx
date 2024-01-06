/* eslint-disable max-len */
import React from 'react';
import { LatLngExpression } from 'leaflet';
import { Map } from '../../elements/Map/Map';
import { addresses } from '../../helpers/utils/constants';
import './ContactsPage.scss';
import { Breadcrumbs } from '../../components/Breadcrumbs/Breadcrumbs';

export const ContactsPage: React.FC = () => (
  <div className="contacts">
    <Breadcrumbs page="contacts" />

    <h1 className="contacts__title">Contacts</h1>

    <div className="contacts__addresses">
      {addresses.map(addres => (
        <div key={addres.address} className="contacts__address">
          <div className="contacts__info">
            <div className="contacts__wrapper">
              <a href={`tel:${addres.tel}`} className="contacts__link">
                <p className="contacts__name">Tel:</p>
                <p className="contacts__text">{addres.tel}</p>
              </a>
            </div>

            <div className="contacts__wrapper">
              <a href={`mailto:${addres.email}`} className="contacts__link">
                <p className="contacts__name">Email:</p>
                <p className="contacts__text">{addres.email}</p>
              </a>
            </div>

            <div className="contacts__wrapper">
              <p className="contacts__name">Address:</p>
              <p className="contacts__text">{addres.address}</p>
            </div>

            <div className="contacts__wrapper">
              <p className="contacts__name">Working days:</p>
              <p className="contacts__text">{addres.schedule}</p>
            </div>
          </div>
          <Map address={Array.from(addres.coordinates) as unknown as LatLngExpression} />
        </div>
      ))}
    </div>
  </div>
);
