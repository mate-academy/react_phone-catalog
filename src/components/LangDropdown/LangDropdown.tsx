import React, { useEffect, useState } from 'react';
import { Transition, TransitionStatus } from 'react-transition-group';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';

import { LOCALES } from '../../helpers/Locales';

import './LangDropdown.scss';

type Props = {
  rootClassName: string,
};

export const LangDropdown: React.FC<Props> = React.memo(({ rootClassName }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const settedLang = searchParams.get('lang') || 'en';

  const [isListShowed, setIsListShowed] = useState(false);
  const { i18n } = useTranslation();

  const handleLangButtonChange = (lang: string) => {
    const selectedLocale = Object.keys(LOCALES)
      .find(locale => LOCALES[locale] === lang) || 'en';
    const params = new URLSearchParams(searchParams);

    params.set('lang', selectedLocale);
    setSearchParams(params);

    i18n.changeLanguage(selectedLocale);
    setIsListShowed(false);
  };

  const getLangs = () => Object.values(LOCALES)
    .filter(lang => LOCALES[settedLang] !== lang);

  useEffect(() => {
    if (settedLang) {
      i18n.changeLanguage(settedLang);
    }
  }, [settedLang, i18n]);

  return (
    <div
      className={classNames(
        `langDropdown ${rootClassName}__langDropdown`,
      )}
    >
      <button
        className={classNames(
          `langDropdown__button ${rootClassName}__langDropdown-button`,
        )}
        type="button"
        onClick={() => setIsListShowed(prevState => !prevState)}
      >
        {LOCALES[settedLang]}
      </button>

      <Transition
        in={isListShowed}
        timeout={300}
        mountOnEnter
        unmountOnExit
      >
        {(state: TransitionStatus) => (
          <ul
            className={classNames(
              `langDropdown__list langDropdown__list--${state} ${rootClassName}__list`,
            )}
          >
            {getLangs().map(lang => (
              <li
                className={classNames(
                  `langDropdown__list-item ${rootClassName}__list-item`,
                )}
                key={lang}
              >
                <button
                  className={classNames(
                    `langDropdown__list-item-button ${rootClassName}__list-item-button`,
                  )}
                  type="button"
                  onClick={() => handleLangButtonChange(lang)}
                >
                  {lang}
                </button>
              </li>
            ))}
          </ul>
        )}
      </Transition>
    </div>
  );
});
