export const FooterButton = () => {
  const scrollUp = () => {
    window.scrollTo({ top: 0 });
  };

  return (
    <button
      type="button"
      className="footer-button"
      onClick={scrollUp}
    >
      Back to top

      <div className="footer-button__icon" />
    </button>
  );
};
