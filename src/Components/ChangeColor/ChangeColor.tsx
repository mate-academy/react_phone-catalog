import { useEffect, useState } from 'react';
import './ChangeColor.scss';
import classNames from 'classnames';

export const ChangeColor = () => {
  const [openTheme, setOpenTheme] = useState(false);

  const resetColors = () => {
    document.documentElement.style.setProperty('--primary-color', '#313237');
    document.documentElement.style.setProperty('--icon-color', '#B4BDC3');
    document.documentElement.style.setProperty('--secondary-color', '#89939A');
    document.documentElement.style.setProperty('--elements-color', '#E2E6E9');
    document.documentElement.style.setProperty('--button-color', '#313237');
    document.documentElement.style.setProperty('--white', '#FFFFFF');
    document.documentElement.style.setProperty('--card-color', '#FFFFFF');
    document.body.style.backgroundColor = '#FFFFFF';

    document.querySelectorAll('.invert').forEach(img => {
      const newColor = img as HTMLElement;

      newColor.style.filter = 'invert(0%)';
    });

    localStorage.setItem('colorScheme', 'light');
  };

  const setColors = () => {
    document.documentElement.style.setProperty('--primary-color', '#F1F2F9');
    document.documentElement.style.setProperty('--icon-color', '#4A4D58');
    document.documentElement.style.setProperty('--secondary-color', '#75767F');
    document.documentElement.style.setProperty('--elements-color', '#3B3E4A');
    document.documentElement.style.setProperty('--button-color', '#905BFF');
    document.documentElement.style.setProperty('--white', '#323542');
    document.documentElement.style.setProperty('--card-color', '#161827');
    document.body.style.backgroundColor = '#0F1121';

    document.querySelectorAll('.invert').forEach(img => {
      const newColor = img as HTMLElement;

      newColor.style.filter = 'invert(100%)';
    });

    localStorage.setItem('colorScheme', 'dark');
  };

  useEffect(() => {
    const appliedColorScheme = () => {
      const colorScheme = localStorage.getItem('colorScheme');

      if (colorScheme === 'dark') {
        setColors();
      } else {
        resetColors();
      }
    };

    appliedColorScheme();

    const blackButton = document.querySelector('.black');
    const whiteButton = document.querySelector('.white');

    whiteButton?.addEventListener('click', resetColors);
    blackButton?.addEventListener('click', setColors);

    return () => {
      blackButton?.removeEventListener('click', setColors);
      whiteButton?.removeEventListener('click', resetColors);
    };
  }, []);

  return (
    <div className="changeColor">
      <div
        className={classNames('changeColor__box', {
          'changeColor__box--open': openTheme,
        })}
      >
        <p className="changeColor__title">Theme color</p>
        <div className="changeColor__colors">
          <button className="changeColor__button black"></button>
          <button className="changeColor__button white"></button>
        </div>
      </div>

      <button
        className="changeColor__setting"
        onClick={() => setOpenTheme(!openTheme)}
      >
        <img
          src="img/settings_3524636.png"
          alt=""
          className="changeColor__icon invert"
        />
      </button>
    </div>
  );
};
