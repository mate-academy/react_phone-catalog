import React from 'react';
import style from './Main.module.scss';

export const Main: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <main className={style.main}>{children}</main>
);
