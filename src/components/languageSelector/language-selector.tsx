import { useTranslation } from 'react-i18next';
import style from './languageSelect.module.scss';

import ReactFlagsSelect from 'react-flags-select';
import { useEffect, useState } from 'react';

import { useWidthSize } from '../../Hooks/useWindowSize';

type CountryCode = 'US' | 'UA';

type CountryLangMap = Record<CountryCode, string>;

const countryToLangMap: CountryLangMap = {
  US: 'en',
  UA: 'ua',
};

const availableCountries = Object.keys(countryToLangMap);

export const LanguageSelector = () => {
  const { t, i18n } = useTranslation();

  const { language } = i18n;

  const { width } = useWidthSize();

  let size: number;

  if (width === undefined) {
    size = 15;
  } else if (width < 640) {
    size = 20;
  } else if (width < 1023) {
    size = 25;
  } else {
    size = 37;
  }

  const [selectedCountryCode, setSelectedCountryCode] = useState('US');

  useEffect(() => {
    const entry = Object.entries(countryToLangMap).find(
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      ([_, langCode]) => langCode === language,
    );

    if (entry) {
      const currentCountryCode = entry[0];

      setSelectedCountryCode(currentCountryCode);
    }
  }, [language]);

  const handleSelect = (countryCode: string) => {
    setSelectedCountryCode(countryCode);

    const langCode = countryToLangMap[countryCode as CountryCode];

    if (langCode) {
      i18n.changeLanguage(langCode);
    }
  };

  return (
    <>
      <div className={style.selected}>
        <span className={style.text}>{t('page.selectedlanguage')}</span>
        <ReactFlagsSelect
          selected={selectedCountryCode}
          onSelect={handleSelect}
          countries={availableCountries}
          className="menu-flags"
          showSelectedLabel={false}
          showSecondarySelectedLabel={false}
          showOptionLabel={false}
          selectButtonClassName="menu-flags-button"
          selectedSize={size}
          optionsSize={15}
        />
      </div>
    </>
  );
};
