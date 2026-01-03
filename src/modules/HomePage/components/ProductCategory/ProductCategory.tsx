import { Link } from 'react-router-dom';
import { Title } from '../../../../components/Title';
import styles from './ProductCategory.module.scss';

type Props = {
  title: string;
  image: string;
  count: number;
  backgroundColor: string;
  link: string;
};

export const ProductCategory: React.FC<Props> = ({
  title,
  image,
  count,
  backgroundColor,
  link,
}) => (
  <div className={styles.category}>
    <Link
      to={`/${link}`}
      className={styles.category__image}
      style={{ backgroundColor: backgroundColor }}
    >
      <img src={image} alt={`category ${title}`} />
    </Link>

    <div className={styles.category__title}>
      <Title text={title} level={4} />
      <p>{`${count} models`}</p>
    </div>
  </div>
);
