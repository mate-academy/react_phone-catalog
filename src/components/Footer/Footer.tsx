import styles from './Footer.module.scss';

const iconSrc = (iconName: string) =>
  `${import.meta.env.BASE_URL}img/icons/${iconName}`;

const footerLinks = [
  {
    href: 'https://github.com/Inna-code10/react_phone-catalog',
    label: 'Github',
  },
  {
    href: '#contacts',
    label: 'Contacts',
  },
  {
    href: '#rights',
    label: 'Rights',
  },
];

export const Footer = () => {
  const handleBackToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.content}>
        <a
          href="https://github.com/Inna-code10/react_phone-catalog"
          className={styles.logoLink}
          aria-label="Nice Gadgets"
          target="_blank"
          rel="noreferrer"
        >
          <span className={styles.logo}>
            <img
              src={iconSrc('logo-ng.svg')}
              alt=""
              className={styles.logoNg}
              aria-hidden="true"
            />
            <img
              src={iconSrc('logo-ok.svg')}
              alt=""
              className={styles.logoOk}
              aria-hidden="true"
            />
          </span>
        </a>

        <nav className={styles.links} aria-label="Footer navigation">
          {footerLinks.map(({ href, label }) => (
            <a
              key={label}
              href={href}
              className={styles.link}
              target={href.startsWith('http') ? '_blank' : undefined}
              rel={href.startsWith('http') ? 'noreferrer' : undefined}
            >
              {label}
            </a>
          ))}
        </nav>

        <button
          type="button"
          className={styles.backToTop}
          onClick={handleBackToTop}
        >
          <span className={styles.backToTopText}>Back to top</span>

          <span className={styles.backToTopButton} aria-hidden="true">
            <img
              src={iconSrc('chevron-arrow-up.svg')}
              alt=""
              className={styles.backToTopIcon}
            />
          </span>
        </button>
      </div>
    </footer>
  );
};
