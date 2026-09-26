import { NavLink } from 'react-router-dom';
import styles from './CategoryCard.module.scss';
import { translations } from '../../translations/translations';
import { useLanguage } from '../context/LanguageContext';

type CategoryCardProps = {
  image: string;
  title: keyof typeof translations.en;
  models: number;
  link: string;
};

export const CategoryCard: React.FC<CategoryCardProps> = ({
  image,
  title,
  models,
  link,
}) => {
  const { t } = useLanguage();

  return (
    <NavLink to={link} className={styles.link}>
      <img src={image} alt={title} className={styles.image} />
      <h3 className={styles.title}>{t(title)}</h3>
      <p className={styles.models}>
        {models} {t('models')}
      </p>
    </NavLink>
  );
};
