import React, { useContext, useEffect, useRef } from 'react';
import './Footer.scss';
import { DispatchContext } from '../../store/ProductsContext';
import { useWindowSize } from '../../hooks/useWindowSize';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  const dispatch = useContext(DispatchContext);
  const footerRef = useRef<HTMLDivElement>(null);
  const size = useWindowSize();

  useEffect(() => {
    if (footerRef.current) {
      const hieght = footerRef.current.getBoundingClientRect().height;

      dispatch({ type: 'hieghtFooter', payload: hieght });
    }
  }, [dispatch, size]);

  return (
    <div className="Footer" ref={footerRef}>
      <div className="Footer__content">
        <Link to="/" className="Footer__logo">
          <img src="icons/Logo.svg" alt="logo" className="Footer__logo-img" />
        </Link>

        <div className="Footer__nav">
          <a
            href="https://github.com/andrii-rykal/react_phone-catalog"
            target="_blank"
            rel="noopener noreferrer"
            className="Footer__nav-item"
          >
            GITHUB
          </a>
          <a
            href="#/"
            target="_blank"
            rel="noopener noreferrer"
            className="Footer__nav-item"
          >
            CONTACTS
          </a>
          <a
            href="#/"
            target="_blank"
            rel="noopener noreferrer"
            className="Footer__nav-item"
          >
            RIGHTS
          </a>
        </div>

        <div className="Footer__buttonBack">
          <span className="Footer__ButtonBack-name">Back to top</span>
          <button
            type="button"
            className="Footer__buttonBack-button"
            onClick={() => window.scroll(0, 0)}
          >
            <img src="icons/button_back.svg" alt="back to top" />
          </button>
        </div>
      </div>
    </div>
  );
};
