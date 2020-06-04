import React from 'react';
import './ErrorPage.scss';

const ErrorPage = () => {
  return (
    <section className="error-page">
      <div className="page-bg" />

      <div className="animation-wrapper">
        <div className="particle particle-1" />
        <div className="particle particle-2" />
        <div className="particle particle-3" />
        <div className="particle particle-4" />
      </div>

      <div className="page-wrapper">
        <h4 className="error-page-text">Item Not Found</h4>
      </div>
    </section>
  );
};

export default ErrorPage;
