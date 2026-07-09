export type HeaderProps = {
  title?: string;
};

import styles from './Header.module.scss';

export const Header = ({ title = 'Welcome' }: HeaderProps) => {
  return (
    <header className={styles.header}>
      <h1 className={styles.header__title}>{title}</h1>
    </header>
  );
};
