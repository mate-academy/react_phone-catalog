import React from 'react';

export const NotFound404 = () => {
  return (
    <section className="section">
      <div className="container">
        <div className="section-title-wrapper">
          <h2>Page Not Found</h2>
        </div>
        <p className="main-text main-text--centered">
          {`. . . but you can try to switch to existing one :)`}
        </p>
      </div>
    </section>
  );
};
