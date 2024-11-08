import { FC } from 'react';

import { LanguagesSelector } from '@components/lang/LanguagesSelector';
import { Search } from '@components/search';
import { ThemeToggle } from '@components/theme-toggle/ThemeToggle';

import styles from './NavUtilities.module.scss';

type TProps = {
  id: string;
};

export const NavUtilities: FC<TProps> = ({ id }) => (
  <div className={styles.utils}>
    <Search />
    <div className={styles.box}>
      <LanguagesSelector />
      <ThemeToggle id={id} />
    </div>
  </div>
);
