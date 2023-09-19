import './BackButton.scss';

export const BackButton = () => {
  const handleGoBack = () => {
    window.history.back();
  };

  return (
    <button
      type="button"
      className="back-button"
      data-cy="backButton"
      onClick={handleGoBack}
    >
      back
    </button>
  );
};
