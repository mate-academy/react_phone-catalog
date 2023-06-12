import leftArrow from '../../Icons/arrow-left-black.svg';

export const BackButton = () => {
  const handleGoBack = () => {
    window.history.back();
  };

  return (
    <div className="back-btn">
      <img src={leftArrow} alt="leftArrow" />

      <button
        type="button"
        className="back-btn__text"
        onClick={handleGoBack}
      >
        Back
      </button>
    </div>
  );
};
