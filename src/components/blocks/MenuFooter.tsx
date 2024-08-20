import classNames from 'classnames';
import { useContext, useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { IsActiveMenuContext } from '../../context/IsActiveMenuContext';

const buttons = [
  { id: 1, name: 'favourites' },
  { id: 2, name: 'cart' },
];

export const MenuFooter = () => {
  const { setIsActiveMenu } = useContext(IsActiveMenuContext);
  const location = useLocation();
  const formattedLocation = useMemo(
    () => location.pathname.split('/'),
    [location],
  );

  return (
    <footer className="footer menu__footer">
      <div className="menu__buttons">
        {buttons.map(button => (
          <Link
            key={button.id}
            to={`/${button.name}`}
            onClick={() => setIsActiveMenu(false)}
            className={classNames(
              `menu__button-block menu__button-block-${button.name}`,
              {
                'menu__button-block-selected':
                  button.name === formattedLocation[1],
              },
            )}
          >
            <span className={`menu__button menu__button-${button.name}`}></span>
          </Link>
        ))}
      </div>
    </footer>
  );
};
