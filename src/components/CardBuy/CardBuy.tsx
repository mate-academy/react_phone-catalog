export const CardBuy = () => {
  const handleGoBack = () => {
    window.history.back();
  };

  return (
    <main>
      <section>
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

      </section>
    </main>
  );
};
