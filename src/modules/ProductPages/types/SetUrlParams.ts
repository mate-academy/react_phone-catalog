export type SetUrlParams = {
  update: string | number;
  urlParams: URLSearchParams;
  currPage: number;
  onUrlParams: (params: URLSearchParams) => void;
};
