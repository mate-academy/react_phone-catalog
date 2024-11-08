import { FC, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { useTheme } from '@hooks/useTheme';

import { ROUTES } from '@utils/constants/routes';
import { getLogoSource } from '@utils/helpers/getLogoSource';

import styles from './Logo.module.scss';

type TProps = {
  onClickAction: () => void;
};

const LogoComponent: FC<TProps> = ({ onClickAction }) => {
  const { theme } = useTheme();
  const { t } = useTranslation();

  const logo = getLogoSource(theme);

  const localTitle = t('logo.title');
  const localAlt = t('logo.alt');

  return (
    <Link
      to={ROUTES.HOME}
      className={styles.logo}
      onClick={onClickAction}
      title={localTitle}
    >
      <img src={logo} alt={localAlt} width={89} height={32} />
    </Link>
  );
};

export const Logo = memo(LogoComponent);

Logo.displayName = 'Logo';
