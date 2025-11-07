import { Link } from 'react-router-dom';
import style from './categoryCard.module.scss';

interface CategoryCardProps {
  name: string;
  path: string;
  count: number;
  desktopImage: string;
  mobileImage: string;
}

export const CategoryCard: React.FC<CategoryCardProps> = ({
  name,
  count,
  desktopImage,
  mobileImage,
  path,
}) => {
  return (
    <div className={`${style.active}`}>
      <Link to={path} className={style.category__link}>
        <picture>
          <source
            media="(max-width: 1023px)"
            srcSet={mobileImage}
            type="image/avif"
          />

          <source
            media="(min-width: 1024px)"
            srcSet={desktopImage}
            type="image/png"
          />

          <img src={desktopImage} alt={`category ${name}`} />
        </picture>
        <div className={style.bottom}>
          <h2 className="title">{name}</h2>
          <span>{count} models</span>
        </div>
      </Link>
    </div>
  );
};
