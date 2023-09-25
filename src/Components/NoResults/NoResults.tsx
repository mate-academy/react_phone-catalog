import './NoResults.scss';

type Props = {
  category: string,
};

export const NoResults: React.FC<Props> = ({ category }) => {
  return (
    <p className="noresults">
      {category}
      &nbsp;not found
    </p>
  );
};
