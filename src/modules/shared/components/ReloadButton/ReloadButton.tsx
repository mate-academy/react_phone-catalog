import { useId } from 'react';
import { ReloadSVG } from '../SVGs/ReloadSVG';
import styles from './ReloadButton.module.scss';
import { useLanguage } from '../Contexts/LanguageContext';
import { HandleReloadClick } from '../../types/handlers';

type Props = {
  onReloadClick: HandleReloadClick;
};

export const ReloadButton: React.FC<Props> = ({ onReloadClick }) => {
  const id = useId();
  const { accessReload } = useLanguage().localeTexts;

  return (
    <div className={styles.ReloadButton}>
      <label htmlFor={id} className={styles.Label}>
        {accessReload}
      </label>

      <button
        id={id}
        type="button"
        className={styles.Button}
        onClick={onReloadClick}
      >
        <ReloadSVG className={styles.Icon} />
      </button>
    </div>
  );
};
