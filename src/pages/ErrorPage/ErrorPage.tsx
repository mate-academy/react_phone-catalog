import React from 'react';
import './ErrorPage.scss';

type Props = {
  productType?: string | null;
};

export const ErrorPage: React.FC<Props> = ({ productType }) => {
  return (
    <section className="page-error">
      <img
        className="page-error__image"
        src="./categories/no_products.png"
        alt="Page Not Found"
      />
      <div className="page-error__content">
        <h1 className="page-error__title text__h1">
          {productType
            ? `Oops! ${productType} not found...`
            : 'Oops! Page not found...'}
        </h1>
        <p className="page-error__description text__h3">
          Oops! It looks like youve ventured into
          the digital realm of gadgets and tech, but the page you
          searching for seems to be lost in cyberspace.
        </p>
        <br />
        <p className="page-error__description text__h3">
          Fear not! Our tech-savvy team is here to help.
          You can navigate back to our homepage or explore other exciting
          pages to continue your tech journey. Happy surfing!
        </p>
      </div>
    </section>
  );
};

ErrorPage.defaultProps = {
  productType: null,
};
