export type BookType = 'paperback' | 'kindle' | 'audiobook';

export interface BookSpecification {
  label: string;
  value: string | number | null | undefined;
}
