import './FooterNavigation.scss';

const links = {
  github: 'https://github.com/ShamievDavid',
  contacts: 'https://davydshamiiev.netlify.app',
  rights: 'https://davydshamiiev.netlify.app',
};

export const FooterNavigation = () => {
  const linksRender = () => {
    return Object.entries(links).map(([name, link]) => (
      <a
        key={name}
        className="footer-nav__link"
        href={link}
        target="_blank"
        rel="noreferrer"
      >
        {name}
      </a>
    ));
  };

  return (
    <nav className="footer-nav">
      {linksRender()}
    </nav>
  );
};
