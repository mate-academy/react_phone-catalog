import './FooterNavigation.scss';

const links = {
  github: 'https://github.com/ShamievDavid',
  contacts: 'https://davydshamiiev.netlify.app',
  rights: 'https://davydshamiiev.netlify.app',
};

export const FooterNavigation = () => {
  const linksRender = () => {
    return Object.entries(links).map(link => (
      <a
        className="footer-nav__link"
        href={link[1]}
        target="_blank"
        rel="noreferrer"
      >
        {link[0]}
      </a>
    ));
  };

  return (
    <nav className="footer-nav">
      {linksRender()}
    </nav>
  );
};
