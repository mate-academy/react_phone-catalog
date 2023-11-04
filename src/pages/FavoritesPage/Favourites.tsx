import React from 'react';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import './Favourites.scss';

export const Favourites: React.FC = () => {
  return (
    <div className="Favourites">
      <div className="container">
        <div className="Favourites__content">
          <Breadcrumbs page="Favourites" />
        </div>
      </div>
    </div>
  );
};
