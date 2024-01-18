import { Link } from 'react-router-dom';
import './Category.scss';
import cn from 'classnames';
import { getName } from '../../helpers/getName';
import { categoriesPath } from '../../helpers/constants';

type Props = {
  i: number,
  image: string,
  amount: number;
};

export const Category: React.FC<Props> = ({ i, image, amount }) => {
  return (
    <div className="category">
      <Link
        className={cn('category__images-container',
          `category__images-container--${i + 1}`)}
        to={`/${categoriesPath[i]}`}
      >
        <img
          src={image}
          alt=""
          className={cn('category__image',
            `category__image--${i + 1}`)}
        />
      </Link>

      <div className="category__content">
        <h3 className="category__name">
          {getName(i)}
        </h3>

        <p className="category__models">{`${amount} models`}</p>
      </div>
    </div>
  );
};
