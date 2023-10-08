import { Button } from '../Button/Button';
import { Logo } from '../Logo/Logo';
import './Footer.scss';

export const Footer: React.FC = () => {
  /* eslint-disable-next-line max-len */
  const rights = 'https://github.com/gabriella135/react_phone-catalog/blob/master/LICENSE';

  return (
    <footer className="Footer">
      <div className="Footer__content container">
        <Logo />

        <div className="Footer__info">
          <ul className="Footer__list">
            <li className="Footer__list-item">
              <a
                rel="noreferrer"
                target="_blank"
                href="https://github.com/gabriella135/react_phone-catalog"
              >
                Github
              </a>
            </li>

            <li className="Footer__list-item">
              <a
                href="mailto:gabriella.ivanjuk@gmail.com"
              >
                Contacts
              </a>
            </li>

            <li className="Footer__list-item">
              <a
                rel="noreferrer"
                target="_blank"
                href={rights}
              >
                Rights
              </a>
            </li>
          </ul>
        </div>

        <div className="Footer__anchor">
          <span className="Footer__anchor-text">
            Back to top
          </span>
          <Button
            content="arrow"
            arrowDirection="top"
            onClick={() => window.scrollTo(0, 0)}
          />
        </div>
      </div>
    </footer>
  );
};
