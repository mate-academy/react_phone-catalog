import './messageError.scss';

export const ErrorBlock = () => {
  return (
    <div className="error-block">
      <p className="error-block-p01">Something went wrong!</p>
      <p className="error-block-p02">
        Please reload the site, or report problem.
      </p>
    </div>
  );
};
