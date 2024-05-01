import './NoResults.scss';

type Props = {
  message?: string;
  description?: string;
  text?: string;
};

export const NoResults: React.FC<Props> = ({ message, description, text }) => {
  return (
    <div className="no-result">
      <p className="no-result__message">{message}</p>
      {description && (
        <p className="no-result__text">
          {description}
          <br />
          {text}
        </p>
      )}
    </div>
  );
};
