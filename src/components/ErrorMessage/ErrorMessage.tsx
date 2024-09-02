type Props = {
  className?: string;
  errorMessage: string;
};

export const ErrorMessage: React.FC<Props> = ({
  className = '',
  errorMessage,
}) => {
  return (
    <div className={`error-message ${className}`.trim()}>
      <span className="error-message__notification">{errorMessage}</span>
      <button
        className="error-message__reload-btn"
        onClick={() => window.location.reload()}
      >
        Reload
      </button>
    </div>
  );
};
