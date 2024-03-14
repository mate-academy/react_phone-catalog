import classNames from 'classnames';
import './Category.scss';
import { Link } from 'react-router-dom';
import { categoriesPath } from '../../helpers/constants';
import { getName } from '../../helpers/getName';

type Props = {
  i: number;
  image: string;
  amount: number;
};

export const Category: React.FC<Props> = ({ i, image, amount }) => {
  return (
    <div className="category" data-cy="categoryLinksContainer">
      <Link
        className={classNames(
          'category__images-container',
          `category__images-container--${i + 1}`,
        )}
        to={`/${categoriesPath[i]}`}
      >
        <img
          src={image}
          alt=""
          className={classNames('category__image', `category__image--${i + 1}`)}
        />
      </Link>

      <div className="category__content">
        <h3 className="category__name">{getName(i)}</h3>
        <p className="category__models">{`${amount} models`}</p>
      </div>
    </div>
  );
};
