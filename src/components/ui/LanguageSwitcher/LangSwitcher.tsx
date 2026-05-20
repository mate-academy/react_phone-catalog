import { useTranslation } from 'react-i18next';
import { Languages } from 'lucide-react';
import styles from './LangSwitcher.module.scss';

export const LangSwitcher = ({ className = '' }: { className?: string }) => {
  const { i18n } = useTranslation('common');

  const toggleLang = () => {
    const newLang = i18n.language === 'ua' ? 'en' : 'ua';

    i18n.changeLanguage(newLang);
  };

  return (
    <button
      onClick={toggleLang}
      className={`${styles.controlBtn} ${className}`}
      title="Change Language"
    >
      <Languages size={16} strokeWidth={1.5} />
      <span className={styles.lang}>
        {(i18n.language || 'ua').toUpperCase()}
      </span>
    </button>
  );
};
