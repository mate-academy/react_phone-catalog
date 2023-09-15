import { Breadcrumbs } from '../components/Breadcrumbs';
import { CommingSoonPage } from '../components/CommingSoonPage/CommingSoonPage';

export const Rights = () => {
  return (
    <div className="page__container">
      <section className="page__section">
        <Breadcrumbs currentPageTitle="Rights" />

        <CommingSoonPage />
      </section>
    </div>
  );
};
