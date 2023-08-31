import { useRef } from 'react';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { TitleOfPage } from '../components/TitleOfPage';

export const Tablets = () => {
  const isArrow = useRef(false);

  return (
    <div className="page__container">
      <section className="page__section">
        <Breadcrumbs currentPageTitle="Tablets" />

        <TitleOfPage
          title="Tablets page is not finished yet"
          backArrow={isArrow.current}
        />
      </section>
    </div>
  );
};
