import './Footer.scss';
import { Logo } from '../Logo/Logo';
import { Button } from '../Button/Button';

export const Footer = () => {
  return (
    <footer className="Footer">
      <div className="Footer__content container container--main">
        <Logo />

        <ul className="Footer__list">
          <li className="Footer__list-item">
            <a href="https://github.com/2pasha">
              Github
            </a>
          </li>

          <li className="Footer__list-item">
            <a href="https://www.linkedin.com/in/pavlo-kostyshyn-5871b8196/">
              contacts
            </a>
          </li>

          <li className="Footer__list-item">
            <a href="#/">
              rights
            </a>
          </li>
        </ul>

        <div className="Footer__anchor">
          <label
            htmlFor="scrollToTop"
            className="Footer__anchor--text"
          >
            Back to top
          </label>

          <Button
            id="scrollToTop"
            variant="arrow"
            arrowDirection="top"
            aria-label="scroll to the top"
            onClick={() => window.scrollTo(0, 0)}
          />
        </div>
      </div>
    </footer>
  );
};
