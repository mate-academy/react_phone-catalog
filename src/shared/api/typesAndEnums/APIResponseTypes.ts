import { BaseProduct } from '@shared/types/APITypes';

interface ErrorMessage {
  status: false;
  message: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
interface BasicResponse<T = any> {
  status: true;
  data: T;
}

interface CatalogueResponse extends BasicResponse<BaseProduct[]> {
  currentPage: number;
  pages: number;
}

export { type ErrorMessage, type BasicResponse, type CatalogueResponse };
