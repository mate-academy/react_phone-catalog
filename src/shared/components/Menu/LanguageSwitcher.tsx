import { useTranslation } from 'react-i18next';

import { Dropdown } from '@/shared/components/ui';
import { languages } from '@/shared/constants';

import styles from './LanguageSwitcher.module.scss';

export const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const currentLanguage =
    languages.find(language => language.code === i18n.resolvedLanguage) ??
    languages[0];

  return (
    <Dropdown
      value={currentLanguage}
      values={languages}
      className={styles.switcher}
      selectClassName={styles.select}
      onChange={language => i18n.changeLanguage(language.code)}
      getLabel={language => language.label}
      getKey={language => language.code}
    />
  );
};
