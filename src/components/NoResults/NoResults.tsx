import './NoResults.scss';

type NoResultsProps = {
  categoryName: string;
};

export const NoResults = ({ categoryName }: NoResultsProps) => (
  <h1 className="no-results">{`${categoryName} not found`}</h1>
);
