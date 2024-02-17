import { Link } from 'react-router-dom';
import './CategoryCard.scss';

export enum ImageUrl {
  phones = 'phones-category.jpg',
  tablets = 'tablets-category.jpg',
  accessories = 'accessories-category.jpg',
}

type LinkPass = '/phones' | '/tablets' | '/accessories';

type Props = {
  title: string,
  modelsCount: number,
  photoName: ImageUrl,
  pass: LinkPass,
};

export const CategoryCard: React.FC<Props> = ({
  title,
  modelsCount,
  photoName,
  pass,
}) => {
  return (
    <Link
      to={pass}
      className="category-card"
      data-cy="categoryLinksContainer"
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
