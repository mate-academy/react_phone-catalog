import { useTranslation } from '../../hooks';
import { toggleLanguage } from '../../store/languageSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import styles from './LanguageToggle.module.scss';

export const LanguageToggle = () => {
  const dispatch = useAppDispatch();
  const t = useTranslation();

  const language = useAppSelector(state => state.language.current);

  const isUkrainian = language === 'ua';
  const nextLanguage = isUkrainian ? 'EN' : 'UA';

  const label = isUkrainian
    ? t.common.language.switchToEnglish
    : t.common.language.switchToUkrainian;

  return (
    <button
      className={styles.button}
      type="button"
      aria-label={label}
      title={label}
      onClick={() => dispatch(toggleLanguage())}
    >
      {nextLanguage}
    </button>
  );
};
