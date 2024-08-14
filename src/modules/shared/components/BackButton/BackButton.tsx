import { useNavigate } from 'react-router-dom';
import { LeftArrowSVG } from '../SVGs/LeftArrowSVG';
import styles from './BackButton.module.scss';
import { useLanguage } from '../Contexts/LanguageContext';

export const BackButton: React.FC = () => {
  const navigate = useNavigate();
  const { back } = useLanguage().localeTexts;

  const handleClick = () => {
    navigate(-1);
  };

  return (
    <a className={styles.BackButton} onClick={handleClick}>
      <LeftArrowSVG className={styles.Arrow} />
      {back}
    </a>
  );
};
