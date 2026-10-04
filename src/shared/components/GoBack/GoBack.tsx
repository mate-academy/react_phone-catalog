import { Link } from 'react-router-dom';

import styles from './GoBack.module.scss';
import { Category } from '@/shared/types/Category';
import { useTranslation } from 'react-i18next';

type Props = {
  category?: Category;
};

export const GoBack: React.FC<Props> = ({ category }) => {
  const backLink = category ? `/${category}` : '..';

  const { t } = useTranslation();

  return (
    <Link to={backLink} className={styles.linkBack}>
      <img className={styles.img} src="icons/left.svg" alt="back" />
      <span className={styles.linkBackText}>{t('goBack')}</span>
    </Link>
  );
};
