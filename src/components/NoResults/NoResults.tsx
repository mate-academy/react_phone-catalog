import './noResults.scss';

type Props = {
  category: string,
};

export const NoResults: React.FC<Props> = ({ category }) => {
  const categoryName = category.charAt(0).toUpperCase() + category.slice(1);

  return (
    <section className="no-results">
      <h1 className="no-results__title">
        {`${categoryName} not found`}
      </h1>
    </section>
  );
};
