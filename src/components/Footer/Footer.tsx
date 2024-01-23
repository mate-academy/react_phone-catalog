import React from 'react';
import { Link } from 'react-router-dom';
import { Logo } from '../Logo';

export const Footer: React.FC = () => {
  const links = [
    { title: 'Github', link: 'https://github.com/Ivanenko1402' },
    {
      title: 'Contacts',
      link: 'https://drive.google.com/file/d/1jXqG7L37KJl5PoMLfR'
       + 'ryuvJTw2zjmc55/view?usp=share_link',
    },
    { title: 'rights', link: '/uknow' },
  ];

  return (
    <div className="footer">
      <div className="footer_logo">
        <Logo />
      </div>

      <div className="footer_links">
        {links.map(link => (
          link.link !== '/uknow' ? (
            <a
              href={link.link}
              target="_blank"
              key={link.title}
              className="footer_links_link"
              rel="noreferrer"
            >
              {link.title}
            </a>
          ) : (
            <Link
              to={link.link}
              key={link.title}
              className="footer_links_link"
            >
              {link.title}
            </Link>
          )
        ))}
      </div>

      <button
        type="button"
        className="footer_button"
        onClick={() => window.scrollTo({
          top: 0,
          behavior: 'smooth',
        })}
      >
        Back to top
      </button>
    </div>
  );
};
