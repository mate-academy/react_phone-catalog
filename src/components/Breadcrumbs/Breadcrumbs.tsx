import React from 'react';
import './Breadcrumbs.scss';
import { Link } from 'react-router-dom';

type Props = {
  paths: string[];
};

export const Breadcrumbs: React.FC<Props> = ({ paths }) => {
  return (
    <section className="breadcrumbs">
      <Link
        to="/"
        title="Home"
        className="breadcrumbs__home"
      >
        <img src="./img/icons/Home.svg" alt="Home" />
      </Link>

      {!!paths.length && (
        paths.map((path, i) => (
          <React.Fragment key={path}>
            <img
              src="./img/icons/RightArrow.svg"
              alt="Right Arrow"
              className="breadcrumbs__arrow"
            />

            {i === paths.length - 1 ? (
              <span className="breadcrumbs__link">
                {path}
              </span>
            ) : (
              <Link to={`/${path}`} className="breadcrumbs__link">
                {path}
              </Link>
            )}
          </React.Fragment>
        ))
      )}
    </section>
  );
};
