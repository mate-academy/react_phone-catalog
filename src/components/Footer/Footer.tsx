import { Link } from 'react-router-dom';
import { ScrollButton } from '../ScrollButton/ScrollButton';

import { Logo } from '../Logo';

import './Footer.scss';

export const Footer = () => {
  const names = ['Github', 'Contacts', 'rights'];
  const githubLink = 'https://github.com/romafanasiev';

  return (
    <div className="Footer">
      <div className="wrapper Footer__content">
        <Logo />
        <ul className="Footer__list">
          {names.map((name) => {
            return (
              <li className="Footer__item" key={name}>
                {name === 'Github' ? (
                  <a
                    href={githubLink}
                    target="_blank"
                    rel="noreferrer"
                    className="Footer__link"
                  >
                    Github
                  </a>
                ) : (
                  <Link
                    to="/"
                    className="Footer__link"
                  >
                    {name}
                  </Link>
                )}
              </li>
            );
          })}
        </ul>
        <ScrollButton />
      </div>
    </div>
  );
};
