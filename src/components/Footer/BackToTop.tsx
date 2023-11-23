import './BackToTop.scss';

export const BackToTopButton = () => {
  const scrollUp = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div className="scrollUp">
      <label
        htmlFor="scroll"
        className="scrollUp__text"
      >
        Back to top
      </label>

      <button
        className="scrollUp__button"
        type="button"
        id="scroll"
        onClick={scrollUp}
      >
        <div className="scrollUp__arrow" />
      </button>
    </div>
  );
};
