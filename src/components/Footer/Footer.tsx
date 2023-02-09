import { Link } from 'react-router-dom';
import { Button } from '../../common/Button/Button';
import { Logo } from '../../common/Logo/Logo';
import './Footer.scss';

export const Footer = () => {
  const navLinksList = ['github', 'contacts', 'rights'];

  return (
    <div className="footer">
      <Logo />
      <ul className="footer__navigation-list">
        {
          navLinksList.map((item) => {
            return (
              <li key={item} className="footer__navigation-item">
                <a className="footer__navigation-link" href={item}>
                  {item}
                </a>
              </li>
            );
          })
        }
      </ul>
      <div className="footer__top">
        <div
          onClick={() => {
            window.scroll({
              top: 0,
              left: 0,
              behavior: 'smooth',
            });
          }}
          className="footer__button-up"
          aria-hidden
        >
          <p className="footer__button-text body12">
            Back to top
          </p>
          <Button
            className="arrow up small"
            // onClick={moveLeft}
            image="/icons/Chevron (Arrow Up).svg"
            alt="^"
          />
        </div>
      </div>
    </div>
  );
};
