import styles from './Footer.module.scss';

const projectUrl = 'https://github.com/Inna-code10/react_phone-catalog';

const iconSrc = (iconName: string) => {
  return `${import.meta.env.BASE_URL}img/icons/${iconName}`;
};

const footerLinks = [
  {
    label: 'Github',
    ariaLabel: 'Open the project repository on GitHub',
  },
  {
    label: 'Contacts',
    ariaLabel: 'Open the project repository on GitHub',
  },
  {
    label: 'Rights',
    ariaLabel: 'Open the project repository on GitHub',
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
          href={projectUrl}
          className={styles.logoLink}
          aria-label="Open the project on GitHub"
          target="_blank"
          rel="noopener noreferrer"
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
          {footerLinks.map(({ label, ariaLabel }) => (
            <a
              key={label}
              href={projectUrl}
              className={styles.link}
              aria-label={ariaLabel}
              target="_blank"
              rel="noopener noreferrer"
            >
              {label}
            </a>
          ))}
        </nav>

        <button
          type="button"
          className={styles.backToTop}
          aria-label="Back to the top of the page"
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
