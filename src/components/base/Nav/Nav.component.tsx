import cn from 'classnames';
import { Link } from 'react-router-dom';
import { StatesContext } from '../../../store/GlobalStateProvider';
import { useContext } from 'react';

type Props = {
  navStyle: string;
};

export const Nav: React.FC<Props> = ({ navStyle }) => {
  const { categories } = useContext(StatesContext);

  return (
    <nav className="nav">
      <ul className={cn('nav__list', `nav__list--${navStyle}`)}>
        <Link to="/" className={cn('nav__link', `nav__link--${navStyle}`)}>
          <li className="nav__item">HOME</li>
        </Link>
        {categories.map((category, idx) => {
          return (
            <Link
              to={`${category.id}`}
              className={cn('nav__link', `nav__link--${navStyle}`)}
              key={idx + 1}
            >
              <li className="nav__item">{category.id.toUpperCase()}</li>
            </Link>
          );
        })}
      </ul>
    </nav>
  );
};
