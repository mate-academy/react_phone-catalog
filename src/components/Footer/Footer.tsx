import { useEffect, useState } from 'react';
import { Icon } from '../Icon';
import { Logo } from '../Logo';

export const Footer = () => {
  const [isScrollable, setIsScrollable] = useState(true);

  const checkScroll = () => {
    const isScroll = document.documentElement.scrollHeight > window.innerHeight;

    setIsScrollable(isScroll);
  };

  useEffect(() => {
    checkScroll();

    window.addEventListener('resize', checkScroll);

    const observer = new MutationObserver(() => {
      checkScroll();
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => {
      window.removeEventListener('resize', checkScroll);
      observer.disconnect();
    };
  }, []);

  return (
    <footer className="footer">
      <div className="footer__container container">
        <Logo className="footer__logo" />

        <ul className="footer__list">
          <li className="footer__item">
            <a
              className="footer__link"
              href="https://github.com/ivankovbohdan/react_phone-catalog"
              target="_blank"
              rel="noreferrer"
            >
              Github
            </a>
          </li>
          <li className="footer__item">
            <a
              className="footer__link"
              href="https://github.com/ivankovbohdan"
              target="_blank"
              rel="noreferrer"
            >
              Contacts
            </a>
          </li>
          <li className="footer__item">
            <a
              className="footer__link"
              href="https://github.com/ivankovbohdan"
              target="_blank"
              rel="noreferrer"
            >
              Rights
            </a>
          </li>
        </ul>
        {isScrollable && (
          <button
            className="footer__top-btn"
            onClick={() => {
              window.scrollTo({
                top: 0,
                behavior: 'smooth',
              });
            }}
          >
            <Icon iconName="icon-arrow-up" />
          </button>
        )}
      </div>
    </footer>
  );
};
