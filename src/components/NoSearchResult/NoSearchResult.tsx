import './NoSearchResult.scss';

type Props = {
  query: string,
};

export const NoSearchResult: React.FC<Props> = ({ query }) => (
  <div className="no-results">
    <h1 className="no-results__title">
      {`No results for "${query}"`}
    </h1>

    <p className="no-results__text">
      Sorry, that filter combination has no results.
      <br />
      Please try different criteria.
    </p>
  </div>
);
