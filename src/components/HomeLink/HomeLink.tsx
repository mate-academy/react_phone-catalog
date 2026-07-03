//#region imports
import { FC } from 'react';
import { Link } from 'react-router-dom';
import { LogoIcon } from './components/LogoIcon';
import { useTranslation } from 'react-i18next';
import styles from './HomeLink.module.scss';
//#endregion

type Props = {
  size: 'small' | 'medium';
  variant: 'primary' | 'accent';
};

export const HomeLink: FC<Props> = ({ size, variant }) => {
  const { t } = useTranslation('header');

  return (
    <Link to="/home" className={styles.homeLink} aria-label={t('home')}>
      <LogoIcon size={size} variant={variant} />
    </Link>
  );
};
