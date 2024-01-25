import './styles.scss';

type Props = {
  message: string;
  isOverflow?: boolean;
};

export const Notification: React.FC<Props> = ({ message, isOverflow }) => {
  return (
    isOverflow ? (
      <div className="container">
        <h3 className="notification">{message}</h3>
      </div>
    ) : (
      <h3 className="notification">{message}</h3>
    )
  );
};
