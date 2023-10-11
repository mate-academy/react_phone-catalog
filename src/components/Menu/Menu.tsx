import { Link } from 'react-router-dom';
import './Menu.scss';
import classNames from 'classnames';
import { useState } from 'react';
import { IconWithCounter } from '../IconWithCounter';

export const Menu: React.FC = () => {
  const [isActive, setIsActive] = useState(false);
  const body = document.body;
  const paths = [
    'home',
    'phones',
    'tablets',
    'accessories',
    'favourites',
    'cart'
  ];

  const handleOpenMenu = () => {
    setIsActive(true);
    body.classList.add('with-menu');
  };

  const handleCloseMenu = () => {
    setIsActive(false);
    body.classList.remove('with-menu');
  };

  return (
    <div className="Menu">
      <button
        type="button"
        className="Menu__open"
        onClick={handleOpenMenu}
      />

      <div className={classNames(
        'Menu__content',
        { isActive },
      )}
      >
        <div className="Menu__content-top">
          <button
            type="button"
            className="Menu__close"
            onClick={handleCloseMenu}
          />
        </div>

        <ul className="Menu__list">
          {paths.map(path => (
            <li key={path} className="Menu__item">
              <Link
                to={path}
                onClick={handleCloseMenu}
              >
                {path[0].toUpperCase() + path.slice(1)}
              </Link>
              {(path === 'favourites' || path === 'cart') && (
                <IconWithCounter type={path} />
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
