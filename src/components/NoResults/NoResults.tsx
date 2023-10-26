import './NoResults.scss';

type Props = {
  category: string,
};

export const NoResults: React.FC<Props> = ({ category }) => (
  <div className="no-results">
    <h1 className="no-results__title">
      {`${category} not found`}
    </h1>
  </div>
);
