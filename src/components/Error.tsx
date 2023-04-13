import classNames from 'classnames';

type Props = {
  isError: boolean,
};

export const Error: React.FC<Props> = ({ isError }) => {
  return (
    <div className={classNames(
      'notification-error',
      { 'notification-error--active': isError },
    )}
    >
      <div className="notification-error__title">
        server error response
      </div>
    </div>
  );
};
