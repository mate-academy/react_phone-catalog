import './style.scss';

export const BackButton: React.FC = () => {
  const handleButtonClick = () => {
    window.history.back();
  };

  return (
    <button
      type="button"
      className="back-button"
      data-cy="backButton"
      onClick={handleButtonClick}
    >
      <i className="icon icon--arrow-left" />
      Back
    </button>
  );
};
