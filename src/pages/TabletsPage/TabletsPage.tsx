import { Breadcrumbs } from '../../components/Breadcrumbs';
import { NoResults } from '../../components/NoResults';
import './TabletsPage.scss';

export const TabletsPage = () => {
  return (
    <section className="page__section">
      <div className="container">
        <div className="tablets">
          <Breadcrumbs />
          <h1 className="tablets__title title">Tablets</h1>

          <NoResults pageName="Tablets" />
        </div>
      </div>
    </section>
  );
};
