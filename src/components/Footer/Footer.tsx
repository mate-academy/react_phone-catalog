import { Button } from '../Button/Button';
import { Logo } from '../Logo/Logo';
import './Footer.scss';

export const Footer: React.FC = () => {
  return (
    <footer
      className="Footer"
    >
      <div className="Footer__content container">
        <Logo />

        <div className="Footer__info">
          <ul className="Footer__list">
            <li className="Footer__list-item">
              <a
                rel="noreferrer"
                target="_blank"
                href="https://github.com/sasdaiv"
              >
                Github
              </a>
            </li>
            <li className="Footer__list-item">
              <a
                href="https://github.com/sasdaiv"
              >
                Contacts
              </a>
            </li>
            <li className="Footer__list-item">
              <a
                rel="noreferrer"
                target="_blank"
                href="https://github.com/sasdaiv"
              >
                Rights
              </a>
            </li>
          </ul>
        </div>

        <div className="Footer__anchor">
          <strong className="Footer__anchor-text">
            Back to top
          </strong>

          <Button
            variant="arrow"
            arrowDirection="top"
            aria-label="scroll-top"
            onClick={() => window.scrollTo(0, 0)}
          />
        </div>
      </div>
    </footer>
  );
};
