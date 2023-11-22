export const BackButton = () => {
  const goBack = () => {
    window.history.back();
  };

  return (
    <button
      className="back-button"
      type="button"
      onClick={goBack}
    >
      <div className="back-button__icon" />

      <p className="back-button__text">
        Back
      </p>
    </button>
  );
};
