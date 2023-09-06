/* eslint-disable jsx-a11y/control-has-associated-label */
import classNames from 'classnames';
import { useState } from 'react';
import { Link } from 'react-router-dom';

import './Menu.scss';

const navigation = [
  'home',
  'phones',
  'tablets',
  'accessories',
  'favourites',
  'cart',
];

export const Menu: React.FC = () => {
  const classListBody = document.body.classList;
  const [isActive, setIsActive] = useState(false);

  const handleOpenMenu = () => {
    setIsActive(true);
    classListBody.add('with-menu');
  };

  const handleCloseMenu = () => {
    setIsActive(false);
    classListBody.remove('with-menu');
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
        <div className="Menu__content--top">
          <button
            type="button"
            className="Menu__close"
            onClick={handleCloseMenu}
          />
        </div>

        <ul className="Menu__list">
          {navigation.map(currentLink => (
            <li key={currentLink} className="Menu__item">
              <Link
                to={currentLink}
                onClick={handleCloseMenu}
              >
                {currentLink}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
