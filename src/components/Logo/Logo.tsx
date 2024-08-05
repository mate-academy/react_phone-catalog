import logo from '../../images/nuce-gadgets-logo.png';
import logoDark from '../../images/nuce-gadgets-logo--dark.png';
import { Link } from 'react-router-dom';
import { TRANSLATIONS } from '../../utils/i18n/translations';
import { useTranslation } from 'react-i18next';
import { useContext } from 'react';
import { ThemeContext } from '../../store/ThemeContext';
import styles from './Logo.module.scss';
import classNames from 'classnames';

type Props = {
  footer?: boolean;
};

export const Logo: React.FC<Props> = ({ footer }) => {
  const { t } = useTranslation();
  const { theme } = useContext(ThemeContext);

  return (
    <Link
      to="/"
      className={classNames(styles.block, {
        [styles.header]: !footer,
      })}
      title={t(TRANSLATIONS.logo.title)}
      aria-label={t(TRANSLATIONS.logo.ariaLabel)}
    >
      <img
        src={theme === 'dark-theme' ? logo : logoDark}
        alt={t(TRANSLATIONS.logo.alt)}
        className={footer ? styles.footer__img : styles.header__img}
      />
    </Link>
  );
};
