import type { SetUrlParams } from '../types/SetUrlParams';
import type { DeleteUrlParams } from '../types/DeleteUrlParams';
import { onNavignationLinksType } from '../types/onNavignationLinksType';
import { handleChangeItemsType } from '../types/handleChangeItemsType';
import { PrevOrNextItemsType } from '../types/PrevOrNextItemsType';
import { PaginationDigitLink } from '../types/PaginationDigitLink';
import { TotalPagesCount } from '../types/TotalPagesCount';

export const urlParams = ({
  update,
  urlParams,
  currPage,
  onUrlParams,
}: SetUrlParams) => {
  const params = new URLSearchParams(urlParams.toString());

  params.set('page', currPage.toString());

  if (typeof update === 'number') {
    params.set('perPage', update.toString());
  } else {
    params.set('perPage', update);
  }

  onUrlParams(params);
};

export const deleteUrlParams = ({
  urlParams,
  onUrlParams,
}: DeleteUrlParams) => {
  const params = new URLSearchParams(urlParams.toString());

  params.delete('perPage');
  params.delete('page');
  onUrlParams(params);
};

export const getTotalPages = ({
  items,
  cardsPerPage,
}: TotalPagesCount): number[] => {
  const paginationDigit = Math.ceil(items.length / cardsPerPage);
  const digitArray: number[] = [];

  for (let i = 1; i <= paginationDigit; i++) {
    digitArray.push(i);
  }

  return digitArray;
};

export const onNavignationLinks = ({
  hasUrl,
  hasItemsUrl,
  onStartItem,
  onEndItem,
  actuallyPage,
  perPage,
  urlParams,
  onUrlParams,
  items,
  urlParamsFunction,
}: onNavignationLinksType) => {
  if (!hasUrl && !hasItemsUrl) {
    onStartItem(0);
    onEndItem(items.length);
  } else {
    const start = (actuallyPage - 1) * perPage;
    const end = start + perPage;

    onStartItem(start);
    onEndItem(end);

    urlParamsFunction({
      update: perPage,
      urlParams: urlParams,
      currPage: actuallyPage,
      onUrlParams: onUrlParams,
    });

    if (perPage === items.length) {
      deleteUrlParams({
        urlParams: urlParams,
        onUrlParams: onUrlParams,
      });
    }
  }
};

export const handleChangeItems = ({
  event,
  onCurrentPage,
  onPerPage,
  items,
  actuallyPage,
  urlParamsString,
  onUrlParamsString,
}: handleChangeItemsType) => {
  const value = event.target.value;

  if (value === 'all') {
    onPerPage(items.length);
  } else {
    onPerPage(Number(value));
  }

  onCurrentPage(1);
  urlParams({
    update: value,
    urlParams: urlParamsString,
    currPage: actuallyPage,
    onUrlParams: onUrlParamsString,
  });
};

export const PrevOrNextItems = ({
  onStartItem,
  onEndItem,
  onCurrentPage,
  urlParamsString,
  onUrlParamsString,
  actuallyPage,
  updatePerPage,
  isNext,
}: PrevOrNextItemsType) => {
  onStartItem(prev => (isNext ? prev + updatePerPage : prev - updatePerPage));
  onEndItem(prev => (isNext ? prev + updatePerPage : prev - updatePerPage));
  onCurrentPage(prev => (isNext ? prev + 1 : prev - 1));
  urlParams({
    update: updatePerPage,
    urlParams: urlParamsString,
    currPage: actuallyPage,
    onUrlParams: onUrlParamsString,
  });
};

export const paginationDigitLink = ({
  link,
  perPage,
  onCurrentPage,
  urlParamsString,
  onUrlParamsString,
  actuallyPage,
}: PaginationDigitLink) => {
  let currPage: number;

  if (typeof perPage === 'number') {
    currPage = (+link * +perPage) / +perPage;
  } else {
    currPage = 1;
  }

  onCurrentPage(currPage);
  urlParams({
    update: perPage,
    urlParams: urlParamsString,
    currPage: actuallyPage,
    onUrlParams: onUrlParamsString,
  });
};
