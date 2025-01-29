import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import './Breadcrumbs.scss';

type Path = {
  name: string;
  link?: string;
};

type Props = {
  paths: Path[];
};

export const Breadcrumbs: React.FC<Props> = ({ paths }) => {
  return (
    <div className="breadcrumbs">
      <Link to="/" className="breadcrumbs__home">
        <img src="icons/home.svg" alt="" />
      </Link>

      {paths.map((path, index) => {
        const className = classNames('breadcrumbs__path small-text', {
          'breadcrumbs__path--black': paths.length > 1 && index === 0,
          'breadcrumbs__path--last': index === paths.length - 1,
        });

        return (
          <Fragment key={index}>
            <img src="icons/breadcrumbs_arrow_right.svg" alt="Arrow right" />
            {path.link ? (
              <Link to={path.link} className={className}>
                {path.name}
              </Link>
            ) : (
              <div className={className}>{path.name}</div>
            )}
          </Fragment>
        );
      })}
    </div>
  );
};
