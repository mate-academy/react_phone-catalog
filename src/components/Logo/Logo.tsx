import styles from './Logo.module.scss';

type LogoProps = {
  className?: string;
};

export const Logo: React.FC<LogoProps> = ({ className }) => {
  return (
    <a href="/">
      <picture>
        <source srcSet="img/logo-desktop.svg" media="(min-width: 1024px)" />
        <source srcSet="img/logo-tablet.svg" media="(min-width: 576px)" />
        <img
          src="img/logo-mobile.svg"
          alt="The Nice Gadgets Logo"
          title="The Nice Gadgets Logo"
          className={`${styles.topBar__logo} ${className ?? ''}`}
        />
      </picture>
    </a>
  );
};
