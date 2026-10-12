import { useTranslation } from 'react-i18next';

import HomeIcon from '@/assets/icons/home.svg?react';
import { Button } from '@/shared/components/ui';
import { cn } from '@/shared/utils';

import NotFoundPicture from '../../../../../public/img/product-not-found.png';

import styles from './NotFoundLabel.module.scss';

interface Props {
  title: string;
  className?: string;
  handleClick: () => void;
}

export const NotFoundLabel = ({ title, className, handleClick }: Props) => {
  const { t } = useTranslation();

  return (
    <div className={cn(styles.notFound, className)}>
      <img
        src={NotFoundPicture}
        className={styles.picture}
        alt="Nothing found"
      />
      <h2 className={styles.description}>{title}</h2>
      <Button className={styles.button} onClick={handleClick}>
        <HomeIcon className={styles.button__icon} />
        <span className={styles.button__title}>{t('goToMainPage')}</span>
      </Button>
    </div>
  );
};
