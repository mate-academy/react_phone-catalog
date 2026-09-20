export type PaginationDigitLink = {
  link: number;
  perPage: number | string;
  onCurrentPage: (value: number) => void;
  urlParamsString: URLSearchParams;
  onUrlParamsString: (value: URLSearchParams) => void;
  actuallyPage: number;
  updatePerPage: number;
};
