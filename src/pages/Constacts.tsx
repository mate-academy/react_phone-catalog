import { useRef } from 'react';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { TitleOfPage } from '../components/TitleOfPage';

export const Constacts = () => {
  const isArrow = useRef(false);

  return (
    <div className="page__container">
      <section className="page__section">
        <Breadcrumbs currentPageTitle="Constacts" />

        <TitleOfPage
          title="Constacts"
          backArrow={isArrow.current}
        />
      </section>
    </div>
  );
};
