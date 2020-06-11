import React from 'react';
import { Breadcrumbs } from '../components/Breadcrumbs/Breadcrumbs';

export const AccessoriesPage = () => (
  <div className="Accessories">
    <Breadcrumbs />
    <div className="Accessories__image-wrap">
      <img src="img/not_found.jpg" alt="not found" className="Accessories__not-found"/>
    </div>
  </div>
);
