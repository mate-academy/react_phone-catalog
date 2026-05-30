import React from 'react';
import useLanguageStore, {
  SupportedLanguage,
} from '../../stores/useLanguageStore';
import styles from './LanguageSelect.module.scss';
import CustomSelect2, {
  CustomSelectOption,
} from '../CustomSelect2/CustomSelect2';

const langOptions: CustomSelectOption<SupportedLanguage>[] = [
  { value: 'uk', label: 'UA' },
  { value: 'en', label: 'EN' },
  { value: 'fr', label: 'FR' },
  { value: 'de', label: 'DE' },
];

const LanguageSelect: React.FC = () => {
  const { currentLanguage, setLanguage } = useLanguageStore();

  const handleLanguageChange = (value: string) => {
    setLanguage(value as SupportedLanguage);
  };

  return (
    <>
      <div className={styles.languageSelect__wrapper}>
        <CustomSelect2
          options={langOptions}
          currentValue={currentLanguage}
          onChange={handleLanguageChange}
        />
      </div>
    </>
  );
};

export default LanguageSelect;
