import classNames from 'classnames';

type Props = {
  message: string;
  isError: boolean;
};

export const Message: React.FC<Props> = ({ message, isError }) => {
  return (
    <div
      className={classNames(
        'message',
        { 'message--error': isError },
      )}
    >
      <h3>{message}</h3>
    </div>
  );
};
