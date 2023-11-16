import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';
import { Listbox } from '@headlessui/react';

import { Params } from '../../types/Params';
import { LOCALES } from '../../helpers/Locales';
import { getSearchWith } from '../../helpers/getSearchWith';

import { Dropdown } from '../Dropdown/Dropdown';

import './LangDropdown.scss';

export const LangDropdown: React.FC = React.memo(() => {
  const [searchParams, setSearchParams] = useSearchParams();
  const settedLang = searchParams.get('lang') || 'en';

  const { i18n } = useTranslation();

  useEffect(() => {
    if (settedLang) {
      i18n.changeLanguage(settedLang);
    }
  }, [settedLang, i18n]);

  const setSearchWith = (params: Params) => {
    const search = getSearchWith(params, searchParams);

    setSearchParams(search);
  };

  const handleLangButtonChange = (lang: string) => {
    const selectedLocale = Object.keys(LOCALES)
      .find(locale => LOCALES[locale] === lang) || 'en';

    setSearchWith({ lang: selectedLocale });
    i18n.changeLanguage(selectedLocale);
  };

  const getLangs = () => Object.values(LOCALES)
    .filter(lang => LOCALES[settedLang] !== lang);

  return (
    <Dropdown
      rootClassName="lang"
      selectedItem={LOCALES[settedLang]}
    >
      {getLangs().map(lang => (
        <Listbox.Option
          key={lang}
          value={lang}
          onClick={() => handleLangButtonChange(lang)}
          className="lang-dropdown-list-item"
        >
          {lang}
        </Listbox.Option>
      ))}
    </Dropdown>
  );
});
