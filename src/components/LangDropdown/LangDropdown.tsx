import React, { useState } from 'react';
import { Transition, TransitionStatus } from 'react-transition-group';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';

import { locales } from '../../helpers/Langs';

import './LangDropdown.scss';

type Props = {
  rootClassName: string,
};

export const LangDropdown: React.FC<Props> = React.memo(({ rootClassName }) => {
  const [isListShowed, setIsListShowed] = useState(false);
  const [settedLang, setSettedLang] = useState('English');
  const { i18n } = useTranslation();

  const handleLangButtonChange = (lang: string) => {
    const selectedKey
      = Object.keys(locales).find(key => locales[key] === lang);

    setSettedLang(lang);
    i18n.changeLanguage(selectedKey);
    setIsListShowed(false);
  };

  const getLangs
    = () => Object.values(locales).filter(lang => settedLang !== lang);

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
        {settedLang}
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
