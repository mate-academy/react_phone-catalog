import React from 'react';
import './Direction.scss';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { DirectionPath } from '../../helpers/types/DirectionPath';

type Props = {
  path: DirectionPath[];
};

export const Direction: React.FC<Props> = ({ path }) => {
  return (
    <article className="direction">
      <div className="direction__home">
        <Link to="/" className="direction__icon-link" />
      </div>
      {path.map((point, i) => (
        <div className="direction__point-box" key={point.name}>
          <div className="direction__point-arrow" />
          <Link
            to={point.path}
            className={classNames('direction__point-link', {
              disable: path.length - 1 === i,
            })}
          >
            {point.name}
          </Link>
        </div>
      ))}
    </article>
  );
};
