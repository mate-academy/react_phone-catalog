import styles from './NavLinks.module.scss';
import { LinkNavigate } from '../LinkNavigate';

export const NavLinks = () => {
  const pages = [
    { title: 'home', path: '/' },
    { title: 'phones', path: 'phones' },
    { title: 'tablets', path: 'tablets' },
    { title: 'accessories', path: 'accessories' },
  ];

  return (
    <>
      {pages.map(({ title, path }) => (
        <li key={title} className={styles.nav__item}>
          <LinkNavigate title={title} path={path} />{' '}
        </li>
      ))}
    </>
  );
};
