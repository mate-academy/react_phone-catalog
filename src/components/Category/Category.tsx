import classNames from 'classnames';
import { FC } from 'react';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../app/hooks';
import './category.scss';

interface Props {
  source: string;
  title: string;
  quantity: number;
}

export const Category: FC<Props> = ({ source, title, quantity }) => {
  const getTitlePath = (title: string) => {
    switch (title) {
      case 'Mobile phones':
        return '/phones'

      case 'Tablets':
        return '/tablets'

      case 'Accessories':
        return '/accessories'
    
      default:
        return '';
    }
  }

  const theme = useAppSelector(state => state.theme.value);

  return (
    <div className="category">
      <Link
        to={getTitlePath(title)}
        className={
          classNames(
            'category__link',
            {
              'category__link--gold': title === 'Mobile phones',
              'category__link--grey': title === 'Tablets',
              'category__link--purple': title === 'Accessories',
            },
          )
        }
      >
        <img className="category__image" src={source} alt="Category" />
      </Link>

      <Link 
        to={getTitlePath(title)}
        className={`category__title category__title--${theme}`}
      >
        {title}
      </Link>
      <p className="category__model">{`${quantity} models`}</p>
    </div>
  );
};
