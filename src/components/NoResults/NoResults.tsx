import './NoResults.scss';

type Props = {
  category: string;
};

export const NoResults: React.FC<Props> = ({ category }) => {
  const product = category[0].toUpperCase() + category.slice(1);

  return (
    <div className="NoResults">
      <h2>
        {`${product} not found`}
      </h2>
    </div>
  );
};
