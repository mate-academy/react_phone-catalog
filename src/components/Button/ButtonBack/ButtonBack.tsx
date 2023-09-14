import './ButtonBack.scss';

export const ButtonBack = () => {
  const handleGoBack = () => (
    window.history.back()
  );

  return (
    <button
      type="button"
      className="button-back"
      onClick={handleGoBack}
    >
      <div className="button-back--arrow" />
      Back
    </button>
  );
};
