import React from 'react';
import styles from './NotificationToast.module.scss';
import { toast as sonnerToast } from 'sonner';
import { IconButton } from '../shared/atoms/IconButton';
import { Icon } from '../shared/atoms/Icon';
import { CloseIcon } from '../../assets/icons/close-icon';
import { Typography } from '../shared/atoms/Typography';
import { useTranslation } from 'react-i18next';

interface ToastProps {
  id: string | number;
  description: string;
}

export function toast(toast: Omit<ToastProps, 'id'>) {
  return sonnerToast.custom(id => (
    <NotificationToast id={id} description={toast.description} />
  ));
}

export const NotificationToast: React.FC<ToastProps> = ({
  description,
  id,
}) => {
  const { t } = useTranslation();

  return (
    <div className={styles.toast}>
      <div className={styles.toast__head}>
        <Typography variant="h4">{t('notification.title')}</Typography>
        <IconButton
          size="small"
          onClick={() => {
            sonnerToast.dismiss(id);
          }}
          className={styles.toast__dismiss}
        >
          <Icon color="inherit">
            <CloseIcon />
          </Icon>
        </IconButton>
      </div>
      <div className={styles.toast__body}>
        <Typography variant="body">{description}</Typography>
      </div>
    </div>
  );
};
