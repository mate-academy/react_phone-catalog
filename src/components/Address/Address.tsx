import { NavLink, useLocation, Link } from 'react-router-dom';
import classNames from 'classnames';

import home from '../../images/icons/Home.svg';

import './Address.scss';

export const Address = () => {
  const location = useLocation();
  let links = location.pathname.split('/').slice(1);

  let productName: string[] | undefined;

  if (links.length > 1) {
    productName = links.slice(-1);
    links = links.slice(0, -1);
  }

  return (
    <div className="Address">
      <NavLink to="/" className="Address__link">
        <img src={home} alt="Home link" />
      </NavLink>
      { links.map((link : string) => {
        return (
          <Link
            to={`/${link}`}
            key={link}
            className={
              classNames(
                'Address__path',
                {
                  'Address__path--last':
                  link === links[links.length - 1] && productName === undefined,
                },
              )
            }
          >
            {link.replaceAll('-', ' ')}
          </Link>
        );
      })}
      {productName && (
        <p className="Address__path Address__path--last">
          {productName}
        </p>
      )}
    </div>
  );
};
