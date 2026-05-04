import { Link, NavLink } from 'react-router-dom';

export const Footer = () => {
  const logo = new URL('../../images/Logo.png', import.meta.url).href;
  const arrowUp = new URL(
    '../../images/icons/Chevron Arrow up.svg',
    import.meta.url,
  ).href;
  const navLink = [
    { id: '/', title: 'Github' },
    { id: '/phones', title: 'Contacts' },
    { id: '/tablets', title: 'rights' },
  ];

  return (
    <footer className="footer">
      <div className="footer__line"></div>
      <div className="footer__container">
        <nav className="footer__nav">
          <div className="footer__logo">
            <Link to="/Home">
              <img className="top-bar__logo" src={logo} alt="Logo" />
            </Link>
          </div>
          <div className="footer__navs">
            {navLink.map(link => (
              <nav className="footer__nav-list" key={link.id}>
                <li className="footer__nav-item">
                  <NavLink to={link.id} className="footer__nav-link">
                    {link.title}
                  </NavLink>
                </li>
              </nav>
            ))}
          </div>

          <div className="footer__back">
            <p className="footer__back-text">Back to top</p>
            <Link to="/Home">
              <button className="footer__back-button">
                <img src={arrowUp} alt="" className="footer__back-button-img" />
              </button>
            </Link>
          </div>
        </nav>
      </div>
    </footer>
  );
};
