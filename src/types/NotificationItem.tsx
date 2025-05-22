import { NotificationType } from './NotificationType';

export type NotificationItem = {
  id: string;
  message: string;
  type: NotificationType;
};
