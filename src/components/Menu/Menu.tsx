/* eslint-disable jsx-a11y/control-has-associated-label */
import { Link } from 'react-router-dom';
import './Menu.scss';
import classNames from 'classnames';
import { useState } from 'react';

export const Menu: React.FC = () => {
  const [isActive, setIsActive] = useState(false);
  const paths
    = ['home', 'phones', 'tablets', 'accessories', 'cart', 'favourites'];

  return (
    <div className="Menu">
      <button
        type="button"
        className="Menu__open"
        onClick={() => setIsActive(true)}
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
            onClick={() => setIsActive(false)}
          />
        </div>

        <ul className="Menu__list">
          {paths.map(path => (
            <li key={path} className="Menu__item">
              <Link to={path} onClick={() => setIsActive(false)}>
                {path[0].toUpperCase() + path.slice(1)}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
