export type PaginationOption = '4' | '8' | '16';

export const PAGINATION_OPTIONS: string[] = ['4', '8', '16'];

export function isPaginationOption(option: string): option is PaginationOption {
  return PAGINATION_OPTIONS.includes(option);
}
