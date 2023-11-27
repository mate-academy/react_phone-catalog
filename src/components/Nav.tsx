import { Link, useLocation } from 'react-router-dom';
import classnames from 'classnames';

type Props = {
  items: string[],
};

export const Nav:React.FC<Props> = ({ items }) => {
  const { pathname } = useLocation();
  const linkPath = (item: string) => {
    if (item === 'github') {
      return 'https://github.com/LBondarchuk/react_phone-catalog/tree/develop';
    }

    return item === 'home' ? '/' : item;
  };

  return (
    <nav className="nav">
      <ul className="nav__list">
        {items.map(item => (
          <li key={item}>
            <Link
              to={`${linkPath(item.toLowerCase())}`}
              className={
                classnames(
                  'nav__item', {
                    'nav__item--active':
                    item.toLowerCase() === pathname.slice(1)
                    || (item === 'home' && pathname === '/'),
                  },
                )
              }
            >
              {item}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};
