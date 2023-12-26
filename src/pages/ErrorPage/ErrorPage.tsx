import React from 'react';
import { useLocation } from 'react-router-dom';
import { NoResults } from '../../components/NoResults';

import './ErrorPage.scss';

export const ErrorPage: React.FC = () => {
  const { state } = useLocation();

  return (
    <div className="ErrorPage ErrorPage__container page__container">
      <NoResults title={state?.errorMsg || 'Something wrong'} />
    </div>
  );
};
