import { Breadcrumbs } from '../../UI/Breadcrumbs/Breadcrumbs';
import './NoResults.scss';

type NoResultsProps = {
  categoryName: string;
};

export const NoResults = ({ categoryName }: NoResultsProps) => (
  <main className="products-page">
    <div className="products-page__crumbs">
      <Breadcrumbs />
    </div>
    <h1 className="no-results">{`${categoryName} not found`}</h1>
  </main>
);
