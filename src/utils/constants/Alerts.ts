export type SeverityType = 'warning' | 'info' | 'error';

export const WARNING_ALERT = {
  severity: 'warning' as SeverityType,
  name: 'warning' as SeverityType,
  message: 'Unfortunately, there aren’t that many products available.',
};

export const INFO_ALERT = {
  severity: 'info' as SeverityType,
  name: 'warning' as SeverityType,
  message: 'This is an informational message to keep you updated.',
};

export const ERROR_ALERT = {
  severity: 'error' as SeverityType,
  name: 'warning' as SeverityType,
  message: 'An error has occurred. Please try again later.',
};
