import './Notification.scss';

type Props = {
  text: string;
  type: NotificationType;
};

export const Notification: React.FC<Props> = ({ text, type }) => {
  const src = type === 'warning' ? 'icons/warning.png' : 'icons/check.png';

  return (
    <div className={`Notification ${type}`}>
      <img
        src={src}
        alt="Success"
        className="Notification__icon"
      />
      <span className="Notification__text">
        {text}
      </span>
    </div>
  );
};
