import { CatalogueProduct } from '@shared/types';

interface ErrorMessage {
  status: false;
  message: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
interface BasicResponse<T = any> {
  status: true;
  data: T;
}

interface CatalogueResponse extends BasicResponse<CatalogueProduct[]> {
  currentPage: number;
  pages: number;
}

export { type ErrorMessage, type BasicResponse, type CatalogueResponse };
