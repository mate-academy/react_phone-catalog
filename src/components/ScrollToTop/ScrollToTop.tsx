import './ScrollToTop.scss';

export const ScrollToTop = () => {
  const goTop = () => {
    window.scrollTo({
      top: 0,
    });
  };

  return (
    <button
      type="button"
      className="ScrollToTop"
      onClick={goTop}
    >
      <p className="ScrollToTop__message">Back to top</p>

      <div className="ScrollToTop__button">
        <div className="icon icon--up" />
      </div>
    </button>
  );
};
