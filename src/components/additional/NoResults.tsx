import { Link } from 'react-router-dom';

type Props = {
  text: string;
  isShowButton?: boolean;
  additionalClass?: string;
};

export const NoResults: React.FC<Props> = ({
  text,
  isShowButton = true,
  additionalClass,
}) => {
  return (
    <div className="no-results">
      <p className={`no-results__text ${additionalClass}`}>{text}</p>

      {isShowButton && (
        <Link
          className="backHome-button"
          type="button"
          to="/home"
        >
          Back to Home page
        </Link>
      )}
    </div>
  );
};
