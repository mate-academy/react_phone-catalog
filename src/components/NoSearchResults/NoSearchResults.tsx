import './NoSearchResults.scss';

type Props = {
  categoryName?: string,
};

export const NoSearchResults: React.FC<Props> = ({ categoryName }) => {
  return (
    <div className="NoSearchResults">
      <h1 className="NoSearchResults__title">Oops!</h1>
      <p className="NoSearchResults__paragpraph">
        {`${categoryName || 'Products'} not found`}
      </p>
    </div>
  );
};
