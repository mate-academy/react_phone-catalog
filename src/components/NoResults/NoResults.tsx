import './NoResults.scss';

type Props = {
  category: string,
};

export const NoResults: React.FC<Props> = ({ category }) => (
  <div className="no-results">
    <h1 className="no-results__title">
      {`Sorry, but ${category} are out of stock`}
    </h1>

    <p>
      Please, choose another category.
    </p>
  </div>
);
