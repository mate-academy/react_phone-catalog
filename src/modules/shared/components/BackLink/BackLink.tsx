import { useNavigate } from 'react-router-dom';
import { LeftArrowSVG } from '../SVGs/LeftArrowSVG';
import styles from './BackLink.module.scss';
import { useLanguage } from '../Contexts/LanguageContext';

export const BackLink: React.FC = () => {
  const navigate = useNavigate();
  const { back } = useLanguage().localeTexts;

  const handleClick = () => {
    navigate(-1);
  };

  return (
    <a className={styles.BackLink} onClick={handleClick}>
      <LeftArrowSVG className={styles.Arrow} />
      {back}
    </a>
  );
};
