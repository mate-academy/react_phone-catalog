import { Logo } from '../Logo';
import './Footer.scss';

export const Footer = () => (
  <footer className="Page-Footer Footer">
    <div className="Container">
      <div className="Footer-Content">
        <Logo />

        <nav className="Footer-Nav">
          <ul className="Footer-List">
            <li>
              <a
                className="Footer-Link"
                rel="noreferrer"
                target="_blank"
                href="https://github.com/yuran007"
              >
                github
              </a>
            </li>

            <li>
              <a
                className="Footer-Link"
                rel="noreferrer"
                target="_blank"
                href="https://github.com/yuran007"
              >
                contacts
              </a>
            </li>

            <li>
              <a
                className="Footer-Link"
                rel="noreferrer"
                target="_blank"
                href="https://github.com/yuran007"
              >
                rights
              </a>
            </li>
          </ul>
        </nav>

        <button
          className="Footer-Button"
          type="button"
          onClick={() => window.scrollTo(0, 0)}
        >
          Back&nbsp;to&nbsp;top
        </button>
      </div>
    </div>
  </footer>
);
