type Props = {
  className?: string;
  notification: string;
};

export const Notification: React.FC<Props> = ({
  className = '',
  notification,
}) => {
  return (
    <div className={`notification ${className}`.trim()}>
      <span className="notification__text">{notification}</span>
    </div>
  );
};
