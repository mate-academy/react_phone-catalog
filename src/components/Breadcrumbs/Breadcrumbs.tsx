import React, { useMemo } from 'react';
import {
  Link,
  useLocation,
} from 'react-router-dom';

import { capitalizedLetter } from '../../functions/capitalizedLetter';

type Props = {
  name: string;
};

export const Breadcrumbs: React.FC<Props> = ({ name = '' }) => {
  const location = useLocation();

  const page = useMemo(() => (
    location.pathname.split('/').slice(1)[0]
  ), []);

  const pageName = useMemo(() => (
    capitalizedLetter(page)
  ), []);

  return (
    <div className="breadcrumbs">
      <Link to="/home" className="breadcrumbs__home" />

      <div className="breadcrumbs__icon" />

      {name ? (
        <>
          <Link to={`/${page}`} className="breadcrumbs__link">
            {pageName}
          </Link>

          <div className="breadcrumbs__icon" />

          <p className="breadcrumbs__text">
            {name}
          </p>
        </>
      ) : (
        <p className="breadcrumbs__text">
          {pageName}
        </p>
      )}
    </div>
  );
};
