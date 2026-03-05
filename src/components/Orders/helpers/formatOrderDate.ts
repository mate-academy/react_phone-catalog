import {
  ORDER_DATE_FORMAT_OPTIONS,
  ORDER_DATE_LOCALE,
} from '../constants/dateFormat';

export const formatOrderDate = (dateString: string): string =>
  new Date(dateString).toLocaleDateString(
    ORDER_DATE_LOCALE,
    ORDER_DATE_FORMAT_OPTIONS,
  );
