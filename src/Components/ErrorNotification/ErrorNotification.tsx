import './ErrorNotification.scss';

export const ErrorNotification = () => {
  return (
    <div className="ErrorNotification">
      <p className="ErrorNotification__message">
        Error: Unable to load data from server!
      </p>
    </div>
  );
};
