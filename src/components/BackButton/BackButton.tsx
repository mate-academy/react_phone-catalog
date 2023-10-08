import arrowLeft from '../../Images/Icons/ArrowLeft.svg';

export const BackButton = () => {
  const goBack = () => (
    window.history.back()
  );

  return (
    <button
      data-cy="backButton"
      className="back-button"
      type="button"
      onClick={goBack}
    >
      <img
        src={arrowLeft}
        alt="arrow"
        className="back-button__arrow"
      />
      Back
    </button>
  );
};
