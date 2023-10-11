import './NoSearchResults.scss';

type Props = {
  category: string;
};

export const NoSearchResults: React.FC<Props> = ({ category }) => {
  return (
    <div className="NoSearchResults">
      <h2>{`No ${category} matching the query found 🧐`}</h2>
    </div>
  );
};
