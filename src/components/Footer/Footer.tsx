import React from 'react';
import { Link } from 'react-router-dom';
import { Logo } from '../Logo';

export const Footer: React.FC = () => {
  const links = [
    { title: 'Github', link: '/' },
    { title: 'Contacts', link: '/' },
    { title: 'rights', link: '/' },
  ];

  return (
    <div className="footer">
      <div className="footer_logo">
        <Logo />
      </div>

      <div className="footer_links">
        {links.map(link => (
          <Link
            to={link.link}
            key={link.title}
            className="footer_links_link"
          >
            {link.title}
          </Link>
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
