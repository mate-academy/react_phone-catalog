import './ArrowBack.scss';

export const ArrowBack = () => {
  const handleBack = () => window.history.back();

  return (
    <button
      type="button"
      data-cy="backButton"
      className="arrow-back"
      onClick={handleBack}
    >
      <img
        src="icons/arrow.svg"
        alt="arrow"
        className="arrow-back__arrow"
      />

      <p className="arrow-back__title">Back</p>
    </button>
  );
};
