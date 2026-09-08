import './Loader.scss';

export const Loader = () => {
  return (
    <div className="loader-container">
      <div className="spinner"></div>

      <div className="loading-text">Loading...</div>
    </div>
  );
};
