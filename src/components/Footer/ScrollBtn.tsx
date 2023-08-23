export const ScrollBtn = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <>
      <label
        htmlFor="scroll"
        className="scrollUp__text"
      >
        Back to top
      </label>

      <button
        type="button"
        id="scroll"
        className="scrollUp__container"
        onClick={scrollToTop}
      >
        <div className="arrow arrow--up" />
      </button>
    </>
  );
};
