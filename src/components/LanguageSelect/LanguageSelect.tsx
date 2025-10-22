import React from 'react';
import CustomSelect from '../CustomSelect/CustomSelect';
import useLanguageStore, {
  SupportedLanguage,
} from '../../stores/useLanguageStore'; // Ваші стори
import styles from './LanguageSelect.module.scss';
import CustomSelect2 from '../CustomSelect2/CustomSelect2';

const langOptions = [
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

      {/* <CustomSelect
        options={langOptions}
        selectedValue={currentLanguage}
        onSelectChange={handleLanguageChange}
      /> */}
    </>
  );
};

export default LanguageSelect;
