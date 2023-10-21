import './Error.scss';

export const Error = () => {
  return (
    <div className="container error">
      <div className="error__wrap">
        <p
          className="error__text"
        >
          Something happend, please reload the page
        </p>
        <div className="error__img" />
      </div>
    </div>
  );
};
