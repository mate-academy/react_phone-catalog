import './no-results.scss';

type Props = {
  name: string;
};

export const NoResults: React.FC<Props> = ({ name }) => {
  return (
    <div className="no-results">
      {`${name} not found`}
    </div>
  );
};
