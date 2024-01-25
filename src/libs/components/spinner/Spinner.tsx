import './styles.scss';

type Props = {
  isOverflow?: boolean;
};

export const Spinner: React.FC<Props> = ({ isOverflow }) => {
  return (
    isOverflow ? (
      <div className="container">
        <div className="spinner">Loading...</div>
      </div>
    ) : (
      <div className="spinner">Loading...</div>
    )
  );
};
