import { createContext } from 'react';

export interface PaginationContextType {
  currentPage: number;
  perPage: number;
}

export const PaginationContext = createContext<PaginationContextType | null>(
  null,
);
