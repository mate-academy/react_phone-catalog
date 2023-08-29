import React from 'react';
import {
  Link,
  useLocation,
} from 'react-router-dom';
import './Back.scss';

export const Back = React.memo(() => {
  const { state } = useLocation();

  return (
    <Link
      to={{
        pathname: state?.pathname || '..',
        search: state?.search,
      }}
      className="back"
      data-cy="backButton"
    >
      <img
        src="../image/arrow-left.svg"
        alt="arrow"
        className="back__arrow"
      />
      <span className="back__text">
        Back
      </span>
    </Link>
  );
});
