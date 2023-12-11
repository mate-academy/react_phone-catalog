import './NoResults.scss';

type Props = {
  productName: string;
};

export const NoResults: React.FC<Props> = ({ productName }) => {
  return (
    <p className="no-results">
      {`${productName} not found`}
    </p>
  );
};
