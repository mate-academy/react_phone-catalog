import styles from './LanguageSwitcher.module.scss';
import classNames from 'classnames';
import { Languages } from '../../types/Languages';
import { useTranslation } from 'react-i18next';

export const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (langCode: keyof typeof Languages) => {
    i18n.changeLanguage(langCode);
  };

  return (
    <ul className={styles.langSwitcher}>
      {Object.entries(Languages).map(([langCode, lang]) => (
        <li
          className={classNames(styles.lang, {
            [styles.langIsActive]: i18n.language === langCode,
          })}
          onClick={() => changeLanguage(langCode as keyof typeof Languages)}
          key={langCode}
        >
          {lang}
        </li>
      ))}
    </ul>
  );
};
