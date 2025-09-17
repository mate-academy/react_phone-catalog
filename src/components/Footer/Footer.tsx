import { useNavigate } from 'react-router-dom';
import './Footer.scss';

export const Footer = () => {
  function scrollPage() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  const navigate = useNavigate();

  return (
    <footer className="footer">
      <div className="footer__logo">
        <a className="footer-logo__link">
          <img
            src="./img/logo/logo-nice-gadgets.svg"
            alt="logo-nice-gadgets"
            onClick={() => {
              navigate('/');
              scrollPage();
            }}
          />
        </a>
      </div>
      <div className="footer__links">
        <ul className="footer-list">
          <li className="footer-list__item">
            <a
              className="footer-list__link"
              /* eslint-disable-next-line max-len */
              href="https://github.com/Abdrakhmanov-Renat?tab=overview&from=2025-02-01&to=2025-02-03"
            >
              github
            </a>
          </li>

          <li className="footer-list__item">
            <a
              className="footer-list__link"
              href="mailto:api.test.renat@gmail.com"
            >
              contacts
            </a>
          </li>

          <li className="footer-list__item">
            <a className="footer-list__link" href="/">
              rights
            </a>
          </li>
        </ul>
      </div>
      <div className="footer__button-up">
        <p className="button-up__title">Back to top</p>
        <div onClick={scrollPage} className="button-up__button" />
      </div>
    </footer>
  );
};
