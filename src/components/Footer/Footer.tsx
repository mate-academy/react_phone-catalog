/* eslint-disable max-len */
import Logo from '../../assets/logo.svg';
import ArrowUp from '../../assets/Icons/Arrow_up.svg';
import './Footer.scss';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { Modal } from '../Modal';

export const Footer = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Rights"
      >
        <p>© 2026 Nice Gadgets. All rights reserved.</p>
      </Modal>
      <footer className="footer">
        <div className="footer__logo">
          <img
            src={Logo}
            alt="footer__logo__img"
            className="footer__logo__img"
          />
        </div>

        <ul className="footer__nav">
          <Link
            target="_blank"
            to="https://github.com/Evg3n22/react_phone-catalog"
            className="footer__nav__item"
          >
            Github
          </Link>
          <Link
            target="_blank"
            to="https://www.linkedin.com/in/%D1%94%D0%B2%D0%B3%D0%B5%D0%BD-%D0%B3%D1%83%D0%BB%D0%B5%D0%B2%D0%B0%D1%82%D0%B8%D0%B9-34728a336/"
            className="footer__nav__item"
          >
            Contacts
          </Link>
          <Link
            to="#"
            onClick={() => setIsModalOpen(true)}
            className="footer__nav__item"
          >
            Rights
          </Link>
        </ul>

        <div className="footer__back-to-top">
          <p>Back to top</p>
          <img
            src={ArrowUp}
            alt="arrow_up"
            className="footer__back-to-top__icon"
            onClick={scrollToTop}
          />
        </div>
      </footer>
    </>
  );
};
