import React from 'react';
import './Message.scss';

type Props = {
  text: string;
};

export const Message: React.FC<Props> = ({ text }) => (
  <p className="message">{text}</p>
);
