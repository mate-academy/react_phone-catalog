import { Link } from 'react-router-dom';
import styles from './TitleSection.module.scss';
import React from 'react';
import { useTranslation } from 'react-i18next';

interface Props {
  historyText: string;
  title: string;
  quantity: number;
}

export const TitleSection: React.FC<Props> = ({
  historyText,
  title,
  quantity,
}) => {
  const { t } = useTranslation();

  return (
    <div className={styles.titleSection}>
      <div className={styles.history}>
        <Link className={styles.iconLink} to="/">
          <img src="/img/icons/icon_home.svg" alt="" />
        </Link>
        <img
          className={styles.arrowIcon}
          src="/img/icons/history_arrow_right.svg"
          alt=""
        />
        <p className={styles.historyText}>{historyText}</p>
      </div>
      <div className={styles.textSection}>
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.quantity}>
          {quantity} {title === t('Favourites') ? t('Items') : t('Models')}
        </p>
      </div>
    </div>
  );
};
