import { FC } from 'react';
import { Link } from 'react-router-dom';
import { CustomLink } from '../UI/CustomLink/CustomLink';
import './Category.scss';

type Props = {
  title: string;
  description: string;
  category: string;
};

export const Category: FC<Props> = ({ title, description, category }) => {
  return (
    <div className="category">
      <div className={`category__container category__container--${category}`}>
        <Link
          to={`/${category}`}
          className={`category__photo category__photo--${category}`}
        />
      </div>
      <CustomLink link={`/${category}`}>
        <h3 className="category__title">{title}</h3>
      </CustomLink>
      <span className="category__description">{description}</span>
    </div>
  );
};
