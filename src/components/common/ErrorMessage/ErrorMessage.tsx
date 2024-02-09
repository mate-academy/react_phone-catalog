import React, { memo } from 'react';

import './ErrorMessage.scss';
import { Link, useNavigate } from 'react-router-dom';

interface Props {
  message: string,
  errorImg?: string,
  height?: string,
  width?: string,
}

export const ErrorMessage: React.FC<Props> = memo(({
  message, height, width, errorImg = './img/informative/error-img.webp',
}) => {
  const navigate = useNavigate();

  /* eslint-disable max-len */
  return (
    <section className="error-message" style={{ height, width }}>
      <img
        src={errorImg}
        alt="Error message"
        className="error-message__img"
      />

      <h2 className="error-message__text">{message}</h2>

      <div className="error-message__links">
        <button
          type="button"
          aria-label="Reload page"
          className="error-message__link"
          onClick={() => navigate(0)}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1.33325 8C1.33325 9.5913 1.96539 11.1174 3.09061 12.2426C4.21583 13.3679 5.74195 14 7.33325 14C8.92659 14 10.4533 13.3733 11.5999 12.2667L10.5999 11.2667C10.1801 11.711 9.67355 12.0644 9.11168 12.3052C8.54982 12.546 7.94454 12.669 7.33325 12.6667C3.17325 12.6667 1.09325 7.64 4.03325 4.7C6.97325 1.76 11.9999 3.84667 11.9999 8H9.99992L12.6666 10.6667H12.7333L15.3333 8H13.3333C13.3333 6.4087 12.7011 4.88258 11.5759 3.75736C10.4507 2.63214 8.92455 2 7.33325 2C5.74195 2 4.21583 2.63214 3.09061 3.75736C1.96539 4.88258 1.33325 6.4087 1.33325 8Z" fill="#313237" />
          </svg>

          Reload page
        </button>

        <Link to="/" className="error-message__link">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M7.59087 0.807088C7.83161 0.619846 8.16872 0.619846 8.40946 0.807088L14.4095 5.47375C14.5718 5.60006 14.6668 5.79426 14.6668 5.99999V13.3333C14.6668 13.8638 14.4561 14.3725 14.081 14.7475C13.706 15.1226 13.1973 15.3333 12.6668 15.3333H3.3335C2.80306 15.3333 2.29436 15.1226 1.91928 14.7475C1.54421 14.3725 1.3335 13.8638 1.3335 13.3333V5.99999C1.3335 5.79426 1.42848 5.60006 1.59087 5.47375L7.59087 0.807088ZM2.66683 6.32605V13.3333C2.66683 13.5101 2.73707 13.6797 2.86209 13.8047C2.98712 13.9298 3.15669 14 3.3335 14H12.6668C12.8436 14 13.0132 13.9298 13.1382 13.8047C13.2633 13.6797 13.3335 13.5101 13.3335 13.3333V6.32605L8.00016 2.1779L2.66683 6.32605Z" fill="#313237" />
            <path fillRule="evenodd" clipRule="evenodd" d="M5.3335 8.00001C5.3335 7.63182 5.63197 7.33334 6.00016 7.33334H10.0002C10.3684 7.33334 10.6668 7.63182 10.6668 8.00001V14.6667C10.6668 15.0349 10.3684 15.3333 10.0002 15.3333C9.63197 15.3333 9.3335 15.0349 9.3335 14.6667V8.66668H6.66683V14.6667C6.66683 15.0349 6.36835 15.3333 6.00016 15.3333C5.63197 15.3333 5.3335 15.0349 5.3335 14.6667V8.00001Z" fill="#313237" />
          </svg>

          Go to home page
        </Link>
      </div>
    </section>
  );
  /* eslint-enable */
});
