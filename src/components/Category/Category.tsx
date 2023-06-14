import classNames from 'classnames';
import { FC } from 'react';
import { Link } from 'react-router-dom';
import './category.scss';

interface Props {
  source: string;
  title: string;
  quantity: number;
}

export const Category: FC<Props> = ({ source, title, quantity }) => {
  return (
    <div className="category">
      <Link
        to="/phones"
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
        {/* it should be replaced with real link */}
        <img className="category__image" src={source} alt="Image" />
      </Link>

      <Link to="/phones" className="category__title">{title}</Link>
      <p className="category__model">{`${quantity} models`}</p>
    </div>
  );
};
