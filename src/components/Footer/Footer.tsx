import styles from './Footer.module.scss';
import { BackToTopButton } from '../BackToTopButton/BackToTopButton';

export const Footer = () => {
  const linkList = [
    {
      name: 'Github',
      href: 'https://github.com/AlbinaAlbi/react_phone-catalog',
    },
    {
      name: 'Contacts',
      href: 'https://github.com/AlbinaAlbi/react_phone-catalog',
    },
    {
      name: 'rights',
      href: 'https://github.com/AlbinaAlbi/react_phone-catalog',
    },
  ];

  return (
    <div className={styles.footer}>
      <div className={styles.containerLogo}>
        <img src="./img/image/Logo.svg" alt="Logo" />
      </div>

      <nav className={styles.nav}>
        {linkList.map((el, i) => (
          <a key={i} href={el.href} target="_blank" rel="noreferrer">
            {el.name}
          </a>
        ))}
      </nav>

      <BackToTopButton />
    </div>
  );
};
