import { useRef } from 'react';
import { TitleOfPage } from '../components/TitleOfPage';
import { Breadcrumbs } from '../components/Breadcrumbs';

export const Rights = () => {
  const isArrow = useRef(false);

  return (
    <div className="page__container">
      <section className="page__section">
        <Breadcrumbs currentPageTitle="Rights" />

        <TitleOfPage title="Rights" backArrow={isArrow.current} />
      </section>
    </div>
  );
};
