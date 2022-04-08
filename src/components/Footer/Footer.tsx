import { FunctionComponent } from 'react';

// Styles
import './Footer.scss';

// Types
import { ButtonCallback } from '../../types/ButtonCallback';

// Components
import { Container } from '../Container';
import { Logo } from '../Logo';
import { Button } from '../Button';

export const Footer: FunctionComponent = () => {
  const goTop: ButtonCallback = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer className="Footer">
      <Container>
        <div className="Footer__content">
          <Logo />

          <a
            href="https://github.com/taras-pyda"
            target="_blank"
            rel="noreferrer"
            className="Footer__link"
          >
            Github
          </a>

          <Button
            disablet={false}
            classModificator="Button--arrowUp"
            callback={goTop}
          />
        </div>
      </Container>
    </footer>
  );
};
