import { ReloadSVG } from '../SVGs/ReloadSVG';
import styles from './ReloadButton.module.scss';
import { useLanguage } from '../Contexts/LanguageContext';
import { HandleReloadClick } from '../../types/handlers';

type Props = {
  onReloadClick: HandleReloadClick;
};

export const ReloadButton: React.FC<Props> = ({ onReloadClick }) => {
  const { accessReload } = useLanguage().localeTexts;

  return (
    <button
      type="button"
      className={styles.ReloadButton}
      onClick={onReloadClick}
    >
      <ReloadSVG className={styles.Icon} />
      <span className={styles.Label}>{accessReload}</span>
    </button>
  );
};
