import { Link } from 'react-router-dom';
import { homePath } from '../../consts/paths';
import styles from './LogoLink.module.scss';
import { LogoSVG } from '../SVGs/LogoSVG';
import { useLanguage } from '../Contexts/LanguageContext';
import classNames from 'classnames';

type Props = {
  className?: string;
};

export const LogoLink: React.FC<Props> = ({ className }) => {
  const { accessLogo } = useLanguage().localeTexts;

  return (
    <Link
      to={homePath}
      aria-label={accessLogo}
      className={classNames(styles.LogoLink, className)}
    >
      <LogoSVG className={styles.Image} />
    </Link>
  );
};
