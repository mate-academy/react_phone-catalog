import { NavLink } from 'react-router-dom';
import cn from 'classnames';
import './Menu.scss';

const pagesOfMenu = [
  { name: 'Home', url: '/' },
  { name: 'Phones', url: 'phones' },
  { name: 'Tablets', url: 'tablets' },
  { name: 'Accessories', url: 'accessories' },
];

export const getLinkClass = ({
  isActive,
  className,
}: {
  isActive: boolean;
  className: string;
}) =>
  cn(className, {
    [`${className}--active`]: isActive,
  });

export const Menu = () => {
  return (
    <div className="menu">
      <ul className="menu__list">
        {pagesOfMenu.map(page => (
          <li className="menu__item" key={page.name}>
            <NavLink
              to={page.url}
              className={({ isActive }) =>
                getLinkClass({ isActive, className: 'menu__link' })
              }
            >
              {page.name}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
};
