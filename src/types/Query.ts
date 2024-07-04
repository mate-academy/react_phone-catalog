export type QueryStatus = 'pending' | 'rejected' | 'fulfilled' | 'idle';

export type QueryResponse<T> = T & {
  status: QueryStatus;
  error: string;
};
