import React, { useContext } from 'react';
import { Header } from './modules/Header/Components/Header/Header';
// eslint-disable-next-line max-len
import { AnimatedBody } from './modules/shared/Shared_Components/AnimatedComponents/AnimatedBody';
import classNames from 'classnames';
import { DarkModeContext } from './Store/StoreThemeMode';

export const App: React.FC = () => {
  const { isDark } = useContext(DarkModeContext);

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
