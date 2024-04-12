// import { useContext } from 'react';
// import { ColorThemeContext } from '../ContextProviders';
// import styles from './ThemeSwitcher.module.scss';

export const ThemeSwitcher = () => {
  // const { theme, colorThemeToggler } = useContext(ColorThemeContext);

  return (
    <div>
      <input
        id="toggler"
        type="checkbox"
        readOnly
      />
    </div>
  );
};
