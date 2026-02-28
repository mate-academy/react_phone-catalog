import { Link } from 'react-router-dom';
import styles from '../HomePage/HomePage.module.scss';

type Props = {
  title: string;
  count: number;
  image: string;
  link: string;
  className: string;
  wrapperClassName?: string;
};

export const CategoryCard = ({
  title,
  count,
  image,
  link,
  className,
  wrapperClassName,
}: Props) => (
  <div className={className}>
    <Link to={link}>
      <div
        className={`${styles.category_image_wrapper} ${wrapperClassName ?? ''}`}
      >
        <img className={styles.categories_icon} src={image} alt={title} />
      </div>
    </Link>
    <h4 className={styles.category_title}>{title}</h4>
    <span className={styles.categoty_models}>{count} models</span>
  </div>
);
