import { Breadcrumbs } from '../Breadcrumbs/Breadcrumbs';
import { Navbar } from '../Navbar/Navbar';
import './NoResults.scss';

type NoResultsProps = {
  categoryName: string;
};

export const NoResults = ({ categoryName }: NoResultsProps) => (
  <>
    <Navbar />

    <section className="products-page">
      <div className="products-page__crumbs">
        <Breadcrumbs />
      </div>
      <h1 className="no-results">{`${categoryName} not found`}</h1>
    </section>
  </>
);
