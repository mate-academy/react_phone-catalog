import cn from 'classnames';
import { Link } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { getCategories } from '../../api/products';
import { Category } from '../../types/Category';
import useMediaQuery from '../../utils/useMediaQuery';
import { DispatchContext, StatesContext } from '../store/GlobalStateProvider';
import './Nav.scss';

type Props = {
  navStyle: string;
};

export const Nav: React.FC<Props> = ({ navStyle }) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const dispatch = useContext(DispatchContext);
  const { isMenuOpen } = useContext(StatesContext);
  const isMobile = useMediaQuery('(max-width: 640px)');

  const handleClick = () => {
    if (isMobile) {
      dispatch({ type: 'isMenuOpen', payload: !isMenuOpen });
    }
  };

  useEffect(() => {
    getCategories().then(response => {
      setCategories(response);
    });
  }, []);

  return (
    <nav className="nav">
      <ul className={cn('nav__list', `nav__list--${navStyle}`)}>
        <Link
          to="/"
          className={cn('nav__link', `nav__link--${navStyle}`)}
          onClick={() =>
            isMenuOpen && dispatch({ type: 'isMenuOpen', payload: false })
          }
        >
          <li className="nav__item">HOME</li>
        </Link>

        {Array.isArray(categories) &&
          categories.map((category, idx) => (
            <Link
              to={`/${category.category_name}`}
              className={cn('nav__link', `nav__link--${navStyle}`)}
              key={idx}
              onClick={handleClick}
            >
              <li className="nav__item">
                {category.category_name.toUpperCase()}
              </li>
            </Link>
          ))}
      </ul>
    </nav>
  );
};
