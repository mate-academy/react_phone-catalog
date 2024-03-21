import { useContext, useEffect, useRef } from 'react';
import './Footer.scss';
import { DispatchContext, useWindowSize } from '../../store/ProductsContext';

export const Footer = () => {
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
        <a href="#/" className="Footer__logo">
          <img src="icons/Logo.svg" alt="logo" />
        </a>

        <div className="Footer__nav">
          <a
            href="https://github.com/andrii-rykal/react_phone-catalog"
            className="Footer__nav-item"
          >
            GITHUB
          </a>
          <a href="#/" className="Footer__nav-item">
            CONTACTS
          </a>
          <a href="#/" className="Footer__nav-item">
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
