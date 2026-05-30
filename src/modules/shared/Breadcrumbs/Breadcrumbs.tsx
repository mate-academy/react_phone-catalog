import { Link } from 'react-router-dom';
import s from './Breadcrumbs.module.scss';

export const Breadcrumbs = () => {
  const pathnames = location.pathname
    .split('/')
    .filter(x => x && x !== 'react_phone-catalog');

  const capitalizeWords = (str: string) => {
    if (!str) {
      return '';
    }

    return str
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  return (
    <nav aria-label="breadcrumb" className={s.breadcrumbsWrapper}>
      <ul className={s.breadcrumbs}>
        <li className={s.home}>
          <Link to="/" className={s.homeLink}></Link>
        </li>

        {pathnames.map((name, index) => {
          const routeTo = '/' + pathnames.slice(0, index + 1).join('/');
          const isLast = index === pathnames.length - 1;

          return (
            <li key={name}>
              <span className={isLast ? s.current : ''}>{'>'}</span>
              {isLast ? (
                <span className={s.current}>
                  {capitalizeWords(decodeURIComponent(name))}
                </span>
              ) : (
                <Link to={routeTo} className={s.link}>
                  {capitalizeWords(decodeURIComponent(name))}
                </Link>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
