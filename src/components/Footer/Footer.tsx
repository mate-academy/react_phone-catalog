import './Footer.scss';

export const Footer = ()=> {
    const links = ['GITHUB', 'CONTACTS', 'RIGHTS'];
    return (
        <footer className="footer page__footer">
            <div className="footer__container">
        <div className="footer__logo">
          <a href="#" className="">
            <img src="public/img/Logo2.svg" alt="logo" />
          </a>
        </div>

        <nav className="footer__nav nav">
          <ul className="nav__list nav__list--footer">
            {links.map((link, index) => (
              <li className="nav__item" key={index}>
                <a href="#" className="nav__link">
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="footer__btn">
            <a href="#">Back to top</a>
            <a href="#">
            <img src="public/img/icons/btn-back-to-top.svg" alt="btn-back-to-top"/>
            </a>
        </div>
      </div>
        </footer>
    )
}