import './ButtonToUp.scss';

export const ButtonToUp = () => {
  const handleBackToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <button
      className="button-to-up"
      type="button"
      onClick={handleBackToTop}
    >
      Back to top
      <div className="button-to-up--arrow" />
    </button>
  );
};
