import './NoResults.scss';

type Props = {
  categoryName: string;
};

export const NoResults: React.FC<Props> = ({ categoryName }) => {
  return <div className="noResults">{categoryName} not found</div>;
};
