import './Loader.scss';

export const Loader = () => {
  return (
    <div
      data-cy="loader"
      className="loader"
    >
      <div className="loader__content" />
    </div>
  );
};
