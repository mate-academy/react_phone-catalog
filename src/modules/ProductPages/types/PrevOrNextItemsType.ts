export type PrevOrNextItemsType = {
  onStartItem: (value: number) => void;
  onEndItem: (value: number) => void;
  onCurrentPage: (value: number) => void;
  urlParamsString: URLSearchParams;
  onUrlParamsString: (value: URLSearchParams) => void;
  actuallyPage: number;
  updatePerPage: string | null;
  isNext: boolean;
};
