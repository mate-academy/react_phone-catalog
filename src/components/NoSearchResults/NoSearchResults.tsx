import './NoSearchResults.scss';

type Props = {
  title: string,
};

export const NoSearchResults: React.FC<Props> = ({ title }) => {
  return (
    <div className="noResults">
      <h1 className="noResults__title">
        {`${title} not found...`}
      </h1>
    </div>
  );
};
