import { useNavigate } from 'react-router-dom';
import styles from './Category.module.scss';

export interface CategoryType {
  title: string;
  desc: string;
  img: string;
  link: string;
}

export const Category: React.FC<CategoryType> = ({
  title,
  desc,
  img,
  link,
}) => {
  const navigate = useNavigate();

  return (
    <div className={styles.category}>
      <div
        className={styles['category__image-wrapper']}
        onClick={() => navigate(link)}
      >
        <img className={styles['category__image-src']} src={img} />
      </div>

      <h1 className={styles.category__title}>{title}</h1>

      <p className={styles.category__description}>{desc}</p>
    </div>
  );
};
