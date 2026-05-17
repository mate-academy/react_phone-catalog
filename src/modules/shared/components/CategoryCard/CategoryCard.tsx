import { Link } from 'react-router-dom';
import styles from './CategoryCard.module.scss';
import { useTranslation } from 'react-i18next';

interface Props {
  to: string;
  img: string;
  name: string;
  bgColor: string;
  className: string;
  howManyItem: number;
}

export const CategoryCard: React.FC<Props> = ({
  to,
  img,
  name,
  bgColor,
  className,
  howManyItem,
}) => {
  const { t } = useTranslation();
  return (
    <li className={styles.category}>
      <Link
        to={`/${to}`}
        className={styles.link}
        style={{ backgroundColor: `${bgColor}` }}
      >
        <img
          src={img}
          alt={name}
          className={`${styles.img} ${styles[`img__${className}`]}`}
          loading="lazy"
        />
      </Link>

      <div className={styles.description}>
        <h3 className={styles.name}>{name}</h3>

        <p className={styles.count}>
          {t('ui.models_count', { count: howManyItem })}
        </p>
      </div>
    </li>
  );
};
