import { getRandomNumber } from '../../../utils/getRandomNumber';
import cn from 'classnames';

const mockCategories = ['Home', 'Phones', 'Tablets', 'Accessories'];

type Props = {
  navStyle: string;
};

export const Nav: React.FC<Props> = ({ navStyle }) => {
  return (
    <nav className="nav">
      <ul className={cn('nav__list', `nav__list--${navStyle}`)}>
        {mockCategories.map(category => {
          return (
            <a
              href={`${category}`}
              className={cn('nav__link', `nav__link--${navStyle}`)}
              key={getRandomNumber()}
            >
              <li className="nav__item">{category}</li>
            </a>
          );
        })}
      </ul>
    </nav>
  );
};
