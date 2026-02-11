import { FC, ReactNode } from 'react';
import styles from './Message.module.scss';
import classNames from 'classnames';

interface Props {
  children: ReactNode;
  className?: string;
}

interface MessageComponent extends FC<Props> {
  Icon: FC<Props>;
  Title: FC<Props>;
  Description: FC<Props>;
  Actions: FC<Props>;
}

export const Message: MessageComponent = ({ children, className }) => {
  return (
    <div className={classNames(styles.messageWrapper, className)}>
      {children}
    </div>
  );
};

Message.Icon = function MessageIcon({ children, className }) {
  return (
    <div className={classNames(styles.iconWrapper, className)}>{children}</div>
  );
};

Message.Title = function MessageTitle({ children, className }) {
  return <h3 className={classNames(styles.title, className)}>{children}</h3>;
};

Message.Description = function MessageDescription({ children, className }) {
  return (
    <p className={classNames(styles.description, className)}>{children}</p>
  );
};

Message.Actions = function MessageActions({ children, className }) {
  return (
    <div className={classNames(styles.actions, className)}>{children}</div>
  );
};
