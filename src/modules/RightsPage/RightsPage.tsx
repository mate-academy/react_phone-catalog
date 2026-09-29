import React from 'react';

import { BreadcrumbsNav } from '@/shared/components/BreadcrumbsNav';
import { BackHeader } from '@/shared/components/BackHeader';

import './RightsPage.scss';

export const RightsPage: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <div className="rights-page container">
      <BreadcrumbsNav className="rights-page__breadcrumbs" />
      <BackHeader
        catalogTitle="Rights & Terms"
        className="rights-page__header"
      />

      <section className="rights-page__content">
        <article className="rights-page__card">
          <h2 className="rights-page__section-title">Copyright Notice</h2>
          <p className="rights-page__text">
            © {currentYear} Grigory Nikitenko. All rights reserved. The source
            code, UI architecture, and implementation of this website are the
            intellectual property of the author.
          </p>
        </article>

        <article className="rights-page__card">
          <h2 className="rights-page__section-title">Educational Disclaimer</h2>
          <p className="rights-page__text">
            This website is a non-commercial frontend application created
            exclusively for demonstration and educational purposes as part of a
            developer portfolio.
          </p>
          <p className="rights-page__text">
            No real commercial transactions, payments, or order processing take
            place on this platform.
          </p>
        </article>

        <article className="rights-page__card">
          <h2 className="rights-page__section-title">Trademarks & Assets</h2>
          <p className="rights-page__text">
            All brand names, product titles, specs, logos, and product images
            (including Apple, Samsung, and other trademarks) displayed in this
            catalog belong strictly to their respective copyright holders.
          </p>
        </article>

        <article className="rights-page__card">
          <h2 className="rights-page__section-title">Open Source License</h2>
          <p className="rights-page__text">
            The source code for this project is distributed under the{' '}
            <strong>MIT License</strong>. You are free to inspect and review the
            code on GitHub.
          </p>
        </article>
      </section>
    </div>
  );
};
