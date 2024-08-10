type SearchWithParam = string | number;

export interface SearchWithParams {
  [key: string]: SearchWithParam[] | SearchWithParam | null;
}
