import { useAsyncError, useRouteError } from 'react-router-dom';

export const Error = () => {
  const error: unknown = useRouteError();
  const errorAsync: unknown = useAsyncError();

  return (
    <div className="error-page">
      <h1 className="error-page__title">Oops!</h1>
      <p className="error-page__text">Sorry, an error has occurred.</p>

      <p className="error-page__text">
        {(error as Error)?.message
          || (errorAsync as Error)?.message
          || (error as { statusText?: string })?.statusText}
      </p>
    </div>
  );
};
