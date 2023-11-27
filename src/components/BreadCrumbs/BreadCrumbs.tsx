import { Link, useLocation } from 'react-router-dom';
import './crumbs.scss';

export const BreadCrumbs = () => {
  const location = useLocation();
  const path = location.pathname
    .split('/')
    .slice(1)
    .map(p => p[0].toUpperCase().concat(p.slice(1)).replaceAll(/-/g, ' '));

  return (
    <div className="crumbs" data-cy="breadCrumbs">
      <ul className="crumbs__list">
        <li className="crumbs__item">
          <Link to="/">
            <img src="./img/icons/Home.svg" alt="Home" />
          </Link>
        </li>

        {path.map((p, index) => (
          <li key={p} className="crumbs__item">
            <img src="./img/icons/arrowRight.svg" alt="arrow" />
            {
              path[index] === path[path.length - 1]
                ? <span className="crumbs__path">{p}</span>
                : <Link className="crumbs__link" to={`/${p}`}>{p}</Link>
            }
          </li>
        ))}
      </ul>
    </div>
  );
};
