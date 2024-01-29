import { Link } from 'react-router-dom';
import './CategoryCard.scss';

export enum ImageUrl {
  phones = 'phones-category.jpg',
  tablets = 'tablets-category.jpg',
  accessories = 'accessories-category.jpg',
}

type Props = {
  title: string,
  modelsCount: number,
  photoName: ImageUrl,
};

export const CategoryCard: React.FC<Props> = ({
  title,
  modelsCount,
  photoName,
}) => {
  return (
    <Link
      to="/"
      className="category-card"
    >
      <img
        src={`/img/categories/${photoName}`}
        alt={title}
        className="category-card__photo"
      />
      <h3
        className="category-card__title"
      >
        {title}
      </h3>
      <p
        className="category-card__models-count"
      >
        {`${modelsCount} models`}
      </p>
    </Link>
  );
};
