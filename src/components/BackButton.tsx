import './BackButton.scss';

export const BackButton = () => (
  <button
    type="button"
    className="back-button"
    onClick={() => window.history.back()}
  >
    Back
  </button>
);
