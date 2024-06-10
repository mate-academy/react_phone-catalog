import classNames from 'classnames';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { PageContext } from '../../context/PageContext';

const buttons = [
  { id: 1, name: 'favourites' },
  { id: 2, name: 'cart' },
];

export const MenuFooter = () => {
  const { lastPage } = useContext(PageContext);

  return (
    <footer className="footer menu__footer">
      <div className="menu__buttons">
        {buttons.map(button => (
          <Link
            key={button.id}
            to={`/${button.name}`}
            className={classNames(
              `menu__button-block menu__button-block-${button.name}`,
              { 'menu__button-block-selected': button.name === lastPage },
            )}
          >
            <span className={`menu__button menu__button-${button.name}`}></span>
          </Link>
        ))}
      </div>
    </footer>
  );
};
