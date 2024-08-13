import { Link } from 'react-router-dom';
import './CategoryCard.scss';

type Props = {
  title: string;
  photoSrc: string;
  modelsAmount: number;
  linkSrc: string;
};

export const CategoryCard: React.FC<Props> = ({
  title,
  photoSrc,
  modelsAmount,
  linkSrc,
}) => {
  return (
    <article className="category">
      <Link to={linkSrc} className="category__link">
        <img
          className="category__image"
          src={photoSrc}
          alt="Image of a product category"
        />

        <div className="category__info">
          <h4 className="category__title title title--4">{title}</h4>

          <p className="category__amount">Models: {modelsAmount}</p>
        </div>
      </Link>
    </article>
  );
};
