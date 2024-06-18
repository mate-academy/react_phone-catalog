import './NoResults.scss';

type Props = {
  category: string,
};

export const NoResults: React.FC<Props> = ({ category }) => {
  const categoryTitle = category[0].toUpperCase() + category.slice(1);

  return (
    <>
      <h1 className="no-results">
        {`${categoryTitle}`}
      </h1>

      <div className="no-results__wrap">
        <h2 className="no-results__title">
          Seems like products are out of stock...
        </h2>

        <p className="no-results__description">
          Our team is already working on supplying. Please, come back later.
        </p>
      </div>
    </>
  );
};
