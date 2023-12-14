export const CardBuy = () => {
  const handleGoBack = () => {
    window.history.back();
  };

  return (
    <main>
      <section>
        <div className="container">
          <button
            type="button"
            className="back"
            data-cy="backButton"
            onClick={handleGoBack}
          >
            back
          </button>

          <div>
            Apologies for the inconvenience, but this page
            <br />
            are not available yet!
          </div>
        </div>

      </section>
    </main>
  );
};
