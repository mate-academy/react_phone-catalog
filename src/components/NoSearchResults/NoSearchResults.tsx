import './NoSearchResults.scss';

type Props = {
  searchQuery: string,
};

export const NoSearchResults: React.FC<Props> = ({ searchQuery }) => {
  return (
    <div className="no-searc-results">
      <span className="no-searc-results__text">Hmmm…</span>
      <span className="no-searc-results__text">{`We couldn't find any matches for '${searchQuery}'`}</span>

      <span className="no-searc-results__text">
        Double check your search for any typos or spelling errors
        - or try a different search term.
      </span>
    </div>
  );
};
