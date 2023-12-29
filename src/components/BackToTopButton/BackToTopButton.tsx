import './BackToTopButton.scss';

export const BackToTopButton = () => {
  const goTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <button
      type="button"
      className="back-to-top"
      onClick={goTop}
    >
      <p className="back-to-top__message">Back to top</p>

      <div className="back-to-top__button">
        <div className="icon icon-up" />
      </div>
    </button>
  );
};
