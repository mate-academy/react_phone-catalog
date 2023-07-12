export const BackLink = () => {
  const handleClick = () => {
    window.history.back();
  };

  return (
    <button
      type="button"
      className="back-link"
      onClick={handleClick}
      data-cy="backButton"
    >
      Back
    </button>
  );
};
