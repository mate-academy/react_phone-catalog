import { useState } from 'react';
import { HeaderButton } from '../../UI/Buttons/HeaderButton';
import { UnitedKingdomFlagIcon } from '../../UI/Icon/Flags/UnitedKingdomFlagIcon';
import styles from './LanguageChange.module.scss';
import { UkrainianFlagIcon } from '../../UI/Icon/Flags/UkrainianFlagIcon';
import { useTranslation } from 'react-i18next';

export const LanguageChange = () => {
  const { i18n } = useTranslation();
  const [lang, setLang] = useState<'en' | 'uk'>('en');

  const toogleLang = () => {
    const newLang = i18n.language === 'en' ? 'uk' : 'en';
    i18n.changeLanguage(newLang);
    setLang(newLang);
  };
  return (
    <HeaderButton className={styles.button} onClick={toogleLang}>
      {lang === 'en' ? <UnitedKingdomFlagIcon /> : <UkrainianFlagIcon />}
    </HeaderButton>
  );
};
