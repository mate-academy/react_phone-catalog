import React from 'react';

export const PhonesPage: React.FC = () => {
  return (
    <div className="main__phones phones">
      <div className="container">
        <div className="phones__content">
          <h1 className="phones__title">
            Mobile phones
          </h1>

          <p className="phones__subtitle">
            95 models
          </p>

          <div className="phones__grid">
            <div className="phones__search-panel">
              {/* <Loader /> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
