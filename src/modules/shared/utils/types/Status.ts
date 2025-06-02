export const STATUS = {
  idle: 'idle',
  pending: 'pending',
  resolved: 'resolved',
  rejected: 'rejected',
} as const;

export type Status = (typeof STATUS)[keyof typeof STATUS];
