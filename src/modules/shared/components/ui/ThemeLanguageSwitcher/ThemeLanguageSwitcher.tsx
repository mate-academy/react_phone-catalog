import React, { useContext, useEffect, useState } from 'react';
import './ThemeLanguageSwitcher.scss';
import { icons } from '../../../../../global-assets/static';
import {
  UISettingsDispatch,
  UISettingsState,
} from '../../../reducer/LangThemeReducer';
import i18next from '../../../../../i18next';
import classNames from 'classnames';
import { langs } from '../../../variables';
import { Lang } from '../../../Enum/Lang';

export const ThemeLanguageSwitcher: React.FC = () => {
  const [activeLang, setActiveLang] = useState<boolean>(false);
  const ThemeLightIcon = icons.themeLight.valuePath;
  const ThemeDarkIcon = icons.themeDark.valuePath;
  const IconArrowSmall = icons.arrowSmall.valuePath;

  const settingsState = useContext(UISettingsState);
  const settingsDispatch = useContext(UISettingsDispatch);

  useEffect(() => {
    document.body.classList.remove('light', 'dark');
    document.body.classList.add(settingsState.theme);
  }, [settingsState.theme]);

  useEffect(() => {
    i18next.changeLanguage(settingsState.lang);
    document.documentElement.lang = `${settingsState.lang}`;
    setActiveLang(false);
  }, [settingsState.lang]);

  const handleSwitchTheme = (theme: 'light' | 'dark') => {
    if (theme !== settingsState.theme) {
      settingsDispatch({ type: 'setTheme', payload: theme });
    }
  };

  const handleSwitchLang = (lang: Lang) => {
    if (lang !== settingsState.lang) {
      settingsDispatch({ type: 'setLang', payload: lang });
    }
  };

  const getDropdownContent = () => {
    setActiveLang(!activeLang);
  };

  return (
    <section className="switcher">
      <div
        className={classNames('switcher__theme', {
          'switcher__theme--active':
            settingsState.theme === 'light' || settingsState.theme === 'dark',
          'switcher__theme--active-light': settingsState.theme === 'light',
          'switcher__theme--active-dark': settingsState.theme === 'dark',
        })}
      >
        <button
          className="switcher__theme__btn"
          onClick={() => handleSwitchTheme('dark')}
        >
          <ThemeLightIcon
            className={classNames('switcher__theme__btn', {
              'switcher__theme__btn--active': settingsState.theme === 'light',
            })}
          />
        </button>
        <div
          className={classNames('switcher__theme__indicator', {
            'switcher__theme__indicator--move':
              settingsState.theme === 'light' || settingsState.theme === 'dark',
          })}
        ></div>
        <button
          className={classNames('switcher__theme__btn', {
            'switcher__theme__btn--active': settingsState.theme === 'dark',
          })}
          onClick={() => handleSwitchTheme('light')}
        >
          <ThemeDarkIcon />
        </button>
      </div>
      <div className="switcher__lang">
        <button className="switcher__lang__btn" onClick={getDropdownContent}>
          <span className="switcher__lang__value">{settingsState.lang}</span>
          <IconArrowSmall className="switcher__lang__icon" />
        </button>

        <div
          className={classNames('switcher__lang__content', {
            'switcher__lang__content--active': activeLang,
          })}
        >
          <ul className="switcher__lang__content-list">
            {langs
              .filter(lang => lang.toLowerCase() !== settingsState.lang)
              .map(lang => (
                <button
                  className="switcher__lang__content-item"
                  key={lang}
                  onClick={() => handleSwitchLang(lang)}
                >
                  <span className="switcher__lang__value">{lang}</span>
                </button>
              ))}
          </ul>
        </div>
      </div>
    </section>
  );
};
