import { Button } from '@/components/Button';
import { Logo } from '@/components/Logo';
import './Footer.scss';

enum Links {
  Github = 'https://github.com/nazarkharkevych/react_phone-catalog',
}

export const Footer: React.FC = () => {
  const rights = `${Links.Github}/blob/master/LICENSE`;

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
                href={Links.Github}
              >
                Github
              </a>
            </li>
            <li className="Footer__list-item">
              <a
                href="mailto:nkharkevych@gmail.com"
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
