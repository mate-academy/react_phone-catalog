import noResults from '../../images/noResults.png';

type Props = {
  category: string
};

export const NoResults: React.FC<Props> = ({ category }) => {
  return (
    <section className="main__no-results">
      <h1 className="main__title main__title--development">
        {`Your ${category} is empty`}
      </h1>
      <img
        src={noResults}
        alt="No results"
        className="main__no-results-image"
      />
    </section>
  );
};
