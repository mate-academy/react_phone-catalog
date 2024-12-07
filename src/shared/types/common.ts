export interface DefaultProps {
  id?: string;
  style?: React.CSSProperties;
  title?: string;
  className?: string;
}

export interface DefaultPropsChildren extends DefaultProps {
  children?: React.ReactNode;
}

export type PaginationPage = number | 'all';

export type SortBy = 'newest' | 'high_to_low' | 'low_to_high';

export type ItemsOnPage = '16' | '32';
