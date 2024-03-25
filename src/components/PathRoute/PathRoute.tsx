import { Link, useLocation } from 'react-router-dom';
import React from 'react';
import './PathRoute.scss';
import classNames from 'classnames';

export const PathRoute: React.FC = () => {
  const { pathname } = useLocation();
  const pathFull = pathname.split('/');
  const path = pathFull.slice(1);

  function getRowLink(index: number) {
    const result = [];

    for (let i = 0; i <= index; i += 1) {
      result.push(pathFull[i]);
    }

    return result.join('/');
  }

  return (
    <div className="PathRoute">
      <Link to="/" className="PathRoute__home">
        <img src="icons/Home.svg" alt="To go home page" />
      </Link>

      {path.map((p, i) => (
        <div
          className={classNames('PathRoute__path', {
            'PathRoute__path--shrink': i !== path.length - 1,
          })}
          key={p}
        >
          <img
            src="icons/Vector.svg"
            alt="Vector"
            className="PathRoute__arrow"
          />
          <div className="PathRoute__name">
            <Link to={getRowLink(i + 1)} className="PathRoute__name-item">
              {p.split('-').join(' ')}
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};
