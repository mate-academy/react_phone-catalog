import cn from 'classnames';
import { useTranslation } from '@shared/context';
import { LANGUAGE_LABELS, LANGUAGES } from '@shared/i18n';
import styles from './LanguageSwitcher.module.scss';

export const LanguageSwitcher = () => {
  const { language, setLanguage, t } = useTranslation();

  return (
    <div
      className={styles.switcher}
      role="group"
      aria-label={t('header.language')}
    >
      {LANGUAGES.map(option => (
        <button
          key={option}
          type="button"
          className={cn(styles.option, {
            [styles.optionActive]: option === language,
          })}
          aria-pressed={option === language}
          onClick={() => setLanguage(option)}
        >
          {LANGUAGE_LABELS[option]}
        </button>
      ))}
    </div>
  );
};
