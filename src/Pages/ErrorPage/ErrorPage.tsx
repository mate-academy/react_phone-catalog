import './ErrorPage.scss';

type Props = {
  message?: string,
};

export const ErrorPage: React.FC<Props> = ({ message = 'error' }) => {
  return (
    <section className="error">
      <img src="Images/warning-error.svg" alt="" className="error__img" />

      <p className="error__message">{message}</p>
    </section>
  );
};
