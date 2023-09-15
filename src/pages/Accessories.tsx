import { Breadcrumbs } from '../components/Breadcrumbs';
import { CommingSoonPage } from '../components/CommingSoonPage/CommingSoonPage';

export const Accessories = () => {
  return (
    <div className="page__container">
      <section className="page__section">
        <Breadcrumbs currentPageTitle="Accessories" />

        <CommingSoonPage />
      </section>
    </div>
  );
};
