/* eslint-disable max-len */
import React from 'react';
import { Link } from 'react-router-dom';
import { AnimatedLayout } from '../../shared/Shared_Components/AnimatedComponents/AnimatedLayout';
import { scrollToTop } from '../../../utils/scrollToTop';

export const Footer: React.FC = () => {
  return (
    <AnimatedLayout>
      <footer className="footer">
        <Link className="footer__logo" to={'/'} />

        <div className="footer__links">
          <Link
            className="footer__link"
            target="_blank"
            to="https://github.com/DenLysiak"
          >
            github
          </Link>

          <Link className="footer__link" to="">
            contacts
          </Link>

          <Link className="footer__link" to="">
            rights
          </Link>
        </div>

        <div className="footer__end">
          <button className="footer__button" onClick={scrollToTop} />

          <p className="footer__text">Back to top</p>
        </div>
      </footer>
    </AnimatedLayout>
  );
};
