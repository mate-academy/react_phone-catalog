import './noresults.scss';

export const NoResults: React.FC = () => {
  return (
    <div className="no-results">
      <h2 className="no-results__title">
        Seems like products are out of stock...
      </h2>

      <p className="no-results__description">
        Our team is already working on supplying. Please, come back later.
      </p>
    </div>
  );
};
