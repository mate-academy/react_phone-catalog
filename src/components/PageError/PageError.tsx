import './PageError.scss';

export const PageError = () => {
  const handleReload = () => {
    window.location.reload();
  };

  return (

    <div className="error">
      <h1 className="main__section--title">Please reload page</h1>

      <button
        className="error__btn"
        onClick={handleReload}
        type="button"
        aria-label="btn"
      >
        Reload
      </button>
    </div>
  );
};
