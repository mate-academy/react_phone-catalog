import { Link } from 'react-router-dom';
import { homePath } from '../../consts/paths';
import styles from './LogoLink.module.scss';
import { LogoSVG } from '../SVGs/LogoSVG';
import { useLanguage } from '../Contexts/LanguageContext';

type Props = {
  className?: string;
};

export const LogoLink: React.FC<Props> = ({ className }) => {
  const { accessLogo } = useLanguage().localeTexts;

  return (
    <Link className={className} to={homePath} aria-label={accessLogo}>
      <LogoSVG className={styles.Image} />
    </Link>
  );
};
