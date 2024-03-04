import { Link, useLocation } from 'react-router-dom';
import './Breadcrumbs.scss';

type Props = {
  name?: string;
};

export const Breadcrumbs: React.FC<Props> = ({ name }) => {
  const { pathname } = useLocation();
  const lastPath: string = pathname.split('/')[pathname.split('/').length - 1];

  const normalizeBreadcrumbs = (text: string) => {
    return text[0].toLocaleUpperCase() + text.slice(1);
  };

  return (
    <ul className="breadcrumbs__list" data-cy="breadCrumbs">
      {pathname
        .split('/')
        .slice(0, -1)
        .map(path => (
          <div className="breadcrumbs-block" key={path}>
            <li className="breadcrumbs__item">
              <Link to={`/${path}`} className="breadcrumbs__link">
                {path === '' ? (
                  <div className="breadcrumbs__icon">
                    <span className="icon icon--home" />
                  </div>
                ) : (
                  <span className="breadcrumbs__text breadcrumbs__text-link">
                    {normalizeBreadcrumbs(path)}
                  </span>
                )}
              </Link>
            </li>
            <div className="breadcrumbs__icon">
              <span className="icon icon--arrow-right" />
            </div>
          </div>
        ))}
      <li className="breadcrumbs__item">
        <span className="breadcrumbs__text">
          {!name ? normalizeBreadcrumbs(lastPath) : name}
        </span>
      </li>
    </ul>
  );
};
