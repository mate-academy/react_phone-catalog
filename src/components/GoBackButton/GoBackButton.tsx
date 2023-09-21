export const GoBackButton = () => {
  return (
    <button
      type="button"
      className="goBack"
      data-cy="backButton"
      onClick={() => window.history.back()}
    >
      <span className="arrow arrow--left-disabled" />
      <span className="goBack__span">Back</span>
    </button>
  );
};
