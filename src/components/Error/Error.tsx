import './Error.scss';

export const Error = () => {
  return (
    <div className="error-container">
      <div className="error-icon"></div>

      <div className="error-title">Oops! Something went wrong</div>

      <div className="error-message">
        We cant load the catalog right now. Please check your connection and try
        again.
      </div>

      <button
        className="retry-button"
        onClick={() => {
          window.location.reload();
        }}
      >
        Try Again
      </button>
    </div>
  );
};
