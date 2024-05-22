import { Link, useLocation } from 'react-router-dom';
import './Navigation.scss';
import classNames from 'classnames';

export const Navigation = () => {
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
    <div className="navigation">
      <Link to="/" className="icon icon-home" />
      {path.map((p, i) => (
        <>
          <div className="icon icon-right-disabled" />
          <Link to={getRowLink(i + 1)} className="navigation-link">
            <p
              className={classNames('navigation-title', {
                'navigation-title-active': i === path.length - 1,
              })}
            >
              {p.split('-').join(' ')}
            </p>
          </Link>
          </>
      ))}
    </div>
  );
};
