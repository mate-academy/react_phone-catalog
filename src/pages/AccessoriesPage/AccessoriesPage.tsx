import { Breadcrumbs } from '../../components/Breadcrumbs';
import { NoResults } from '../../components/NoResults';
import './AccessoriesPage.scss';

export const AccessoriesPage = () => {
  return (
    <section className="page__section">
      <div className="container">
        <div className="accessories">
          <Breadcrumbs />
          <h1 className="accessories__title title">Accessories</h1>

          <NoResults pageName="Accessories" />
        </div>
      </div>
    </section>
  );
};
