/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import { Link } from 'react-router-dom';
import './Footer.scss';
import { useEffect, useState } from 'react';
import cn from 'classnames';
import { scrollToTop } from '../../services/utils/scrollToTop';

export const Footer = () => {
  const [isScroll, setIsScroll] = useState(false);

  const hasScroll = () => document.body.scrollHeight > window.innerHeight;

  useEffect(() => {
    const handleScroll = () => {
      if (hasScroll()) {
        setIsScroll(true);
      } else {
        setIsScroll(false);
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, [setIsScroll]);

  return (
    <div className="footer">
      <div className="footer__content">
        <Link to="/" className="footer__logo" />

        <div className="footer__div">
          <Link
            to="https://vk-workshop.github.io/react_phone-catalog/"
            className="footer__nav-link"
            target="_blank"
          >
            <div>GITHUB</div>
          </Link>

          <Link to="contacts" className="footer__nav-link">
            <div>CONTACTS</div>
          </Link>

          <Link to="rights" className="footer__nav-link">
            <div>RIGHTS</div>
          </Link>
        </div>

        <div
          className={cn('footer__back-top-div', {
            'footer__back-top-div--hidden': !isScroll,
          })}
        >
          <p className="footer__back-top-text" onClick={scrollToTop}>
            Back to top
          </p>
          <button
            type="button"
            className="footer__button button top"
            onClick={scrollToTop}
          >
            {}
          </button>
        </div>
      </div>
    </div>
  );
};
