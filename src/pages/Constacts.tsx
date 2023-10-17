import { Breadcrumbs } from '../components/Breadcrumbs';
import { CommingSoonPage } from '../components/CommingSoonPage/CommingSoonPage';

export const Constacts = () => {
  return (
    <div className="page__container">
      <section className="page__section">
        <Breadcrumbs currentPageTitle="Constacts" />

        <CommingSoonPage />
      </section>
    </div>
  );
};
