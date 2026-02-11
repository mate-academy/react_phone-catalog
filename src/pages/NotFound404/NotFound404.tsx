import React from 'react';
import { useLocation } from 'react-router-dom';

export const NotFound404 = () => {
  const location = useLocation();

  return (
    <section className="section">
      <div className="container">
        <div className="section-title-wrapper">
          <h2>Page Not Found</h2>
        </div>

        {location.pathname === '/checkout' ? (
          <>
            <div
              style={{ width: '250px', aspectRatio: '1.50235', margin: 'auto' }}
            >
              <iframe
                src="https://tenor.com/embed/23508347"
                width="100%"
                height="100%"
                allowFullScreen
                title="Vito Scaletta Mafia GIF"
                style={{ border: 'none' }}
              ></iframe>
            </div>
            <p className="main-text main-text--centered">
              Checkout logic wasn&apos;t a part of the deal . . .
            </p>
          </>
        ) : (
          <p className="main-text main-text--centered">
            {`. . . but you can try to switch to existing one :)`}
          </p>
        )}
      </div>
    </section>
  );
};
