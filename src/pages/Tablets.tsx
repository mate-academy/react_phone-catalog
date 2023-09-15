import { Breadcrumbs } from '../components/Breadcrumbs';
import { CommingSoonPage } from '../components/CommingSoonPage/CommingSoonPage';

export const Tablets = () => {
  return (
    <div className="page__container">
      <section className="page__section">
        <Breadcrumbs currentPageTitle="Tablets" />

        <CommingSoonPage />
      </section>
    </div>
  );
};
