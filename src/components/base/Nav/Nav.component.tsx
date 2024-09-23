import cn from 'classnames';
import { Link } from 'react-router-dom';
import {
  DispatchContext,
  StatesContext,
} from '../../../store/GlobalStateProvider';
import { useContext, useEffect, useState } from 'react';
import { getCategories } from '../../../api/products';
import { Category } from '../../../types/Category';
import useMediaQuery from '../../../utils/useMediaQuery';

type Props = {
  navStyle: string;
};

export const Nav: React.FC<Props> = ({ navStyle }) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const dispatch = useContext(DispatchContext);
  const { isMenuOpen } = useContext(StatesContext);
  const isMobile = useMediaQuery('(max-width: 640px');
  const handleClick = () => {
    if (isMobile) {
      if (isMenuOpen) {
        dispatch({ type: 'isMenuOpen', payload: false });
      } else {
        dispatch({ type: 'isMenuOpen', payload: true });
      }
    }

    return isMenuOpen;
  };

  useEffect(() => {
    getCategories().then(cats => setCategories(cats));
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

        {categories.map((category, idx) => {
          return (
            <Link
              to={`${category.id}`}
              className={cn('nav__link', `nav__link--${navStyle}`)}
              key={idx + 1}
              onClick={handleClick}
            >
              <li className="nav__item">{category.id.toUpperCase()}</li>
            </Link>
          );
        })}
      </ul>
    </nav>
  );
};
