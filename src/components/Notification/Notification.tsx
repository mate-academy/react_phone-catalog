import React from 'react';

type Props = {
  title: string,
  text: string,
};

export const Notification: React.FC<Props> = ({ text, title }) => {
  return (
    <div
      style={{ boxShadow: title === 'Succes' ? 'green' : 'red' }}
      className="Notification"
    >
      <h1 className="Notification_title">
        {title}
      </h1>
      <span className="Notification_text">
        {text}
      </span>
    </div>
  );
};
