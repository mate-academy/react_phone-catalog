import { Link } from 'react-router-dom';
import { homePath } from '../../consts/paths';
import styles from './LogoLink.module.scss';
import { LogoSVG } from '../SVGs/LogoSVG';
import { useLanguage } from '../Contexts/LanguageContext';
import classNames from 'classnames';

type HandleClick = () => void;

type Props = {
  className?: string;
  onClick?: HandleClick;
};

export const LogoLink: React.FC<Props> = ({ className, onClick }) => {
  const { accessLogo } = useLanguage().localeTexts;

  return (
    <Link
      to={homePath}
      aria-label={accessLogo}
      className={classNames(styles.LogoLink, className)}
      onClick={onClick}
    >
      <LogoSVG className={styles.Image} />
    </Link>
  );
};
