/* eslint-disable import/no-extraneous-dependencies */
import * as Toast from '@radix-ui/react-toast';

import { FC } from 'react';
import styles from './ToastNotification.module.css';

interface ToastNotificationProps {
  open: boolean;
  title: string;
  description: string;
}

const ToastNotification: FC<ToastNotificationProps> = ({
  open,
  title,
  description,
}) => {
  return (
    <>
      <Toast.Root className={styles.ToastRoot} open={open}>
        <Toast.Title className={styles.ToastTitle}>{title}</Toast.Title>
        <Toast.Description className={styles.ToastDescription}>
          {description}
        </Toast.Description>
      </Toast.Root>
      <Toast.Viewport className={styles.ToastViewport} />
    </>
  );
};

export default ToastNotification;
