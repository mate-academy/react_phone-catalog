import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Breadcrumbs.scss';

type Props = {
  name?: string,
};

const defaultProps: Props = {
  name: '',
};

export const Breadcrumbs: React.FC<Props> = ({ name }) => {
  const locationArray = useLocation().pathname.split('/');
  const categoryLocation = locationArray[1];
  const category = categoryLocation[0].toUpperCase()
    + categoryLocation.slice(1);

  return (
    <div className="Breadcrumbs" data-cy="breadCrumbs">
      <Link to="/">
        <div className="Breadcrumbs__home" />
      </Link>
      <Link
        to={`/${categoryLocation}`}
        className="Breadcrumbs__element text"
      >
        {category}
      </Link>
      {name && (
        <p className="Breadcrumbs__element text">{name}</p>
      )}
    </div>
  );
};

Breadcrumbs.defaultProps = defaultProps;
