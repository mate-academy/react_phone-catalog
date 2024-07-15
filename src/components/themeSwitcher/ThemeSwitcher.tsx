import React, { useEffect } from 'react';
import Styles from './ThemeSwitcher.module.scss';

export const ThemeSwitcher: React.FC = () => {
  useEffect(() => {
    const currentTheme = localStorage.getItem('theme');
    const toggleSwitch = document.querySelector(
      `.${Styles.theme_switch} input[type="checkbox"]`,
    ) as HTMLInputElement;

    if (currentTheme) {
      document.documentElement.setAttribute('data-theme', currentTheme);
    }

    if (currentTheme === 'blue') {
      toggleSwitch.checked = true;
    }

    const handleSwitchChange = (event: Event) => {
      const isChecked = (event.target as HTMLInputElement).checked;
      document.documentElement.setAttribute(
        'data-theme',
        isChecked ? 'blue' : 'light',
      );
      localStorage.setItem('theme', isChecked ? 'blue' : 'light');
    };

    toggleSwitch?.addEventListener('change', handleSwitchChange);

    return () => {
      toggleSwitch?.removeEventListener('change', handleSwitchChange);
    };
  }, []);

  return (
    <div className={Styles.theme_switch__wrapper}>
      <p className={Styles.theme_switch__paragraph}>Theme style</p>

      <label className={Styles.theme_switch} htmlFor="checkbox">
        <input type="checkbox" id="checkbox" />
        <div className={`${Styles.slider} ${Styles.round}`}></div>
      </label>
    </div>
  );
};
