import React, { useContext, useEffect } from 'react';
import { Header } from './modules/Header/Components/Header/Header';
// eslint-disable-next-line max-len
import { AnimatedBody } from './modules/shared/Shared_Components/AnimatedComponents/AnimatedBody';
import classNames from 'classnames';
import { DarkModeContext } from './Store/StoreThemeMode';

export const App: React.FC = () => {
  const { isDark } = useContext(DarkModeContext);

  useEffect(() => {
    if (isDark) {
      document.documentElement.style.setProperty('background-color', '#0f1121');
    } else {
      document.documentElement.style.setProperty('background-color', '#fff');
    }
  }, [isDark]);

  return (
    <div
      className={classNames('App', {
        'App--is-Dark': isDark,
      })}
    >
      <Header />

      <AnimatedBody />
    </div>
  );
};
