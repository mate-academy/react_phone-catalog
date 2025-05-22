import { NotificationItem } from '../types/NotificationItem';

export type NotificationState = {
  notifications: NotificationItem[];
};

type ErrorAction =
  | { type: 'ADD_NOTIFICATION'; payload: NotificationItem }
  | { type: 'REMOVE_NOTIFICATION'; payload: string }
  | { type: 'CLEAR_NOTIFICATIONS' };

export const initialNotificationState: NotificationState = {
  notifications: [],
};

export const notificationReducer = (
  state: NotificationState,
  action: ErrorAction,
) => {
  switch (action.type) {
    case 'ADD_NOTIFICATION':
      return {
        ...state,
        notifications: [...state.notifications, action.payload],
      };

    case 'REMOVE_NOTIFICATION':
      return {
        ...state,
        notifications: state.notifications.filter(
          notification => notification.id !== action.payload,
        ),
      };

    case 'CLEAR_NOTIFICATIONS':
      return {
        ...state,
        notifications: [],
      };

    default:
      return state;
  }
};
