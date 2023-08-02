import React from 'react';

import { BackButton } from '../../components/BackButton/BackButton';

import './NotFoundPage.scss';

export const NotFoundPage: React.FC = () => (
  <div className="NotFoundPage">
    <div className="NotFoundPage__back">
      <BackButton />
    </div>

    <div className="NotFoundPage__title">
      <h1>Page not found...</h1>
    </div>
  </div>
);
