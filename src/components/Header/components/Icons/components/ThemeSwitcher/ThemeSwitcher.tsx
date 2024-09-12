import { useContext } from 'react';
import { ProductContext } from '../../../../../../store/ProductContext';
import './ThemeSwitcher.scss';

export const ThemeSwitcher = () => {
  const { setDarkTheme } = useContext(ProductContext);

  return (
    <div
      className="themeSwitcher"
      onClick={() => {
        setDarkTheme(prev => !prev);
      }}
    ></div>
  );
};
