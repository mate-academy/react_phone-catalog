const CURRENCY_FORMATTER = new Intl.NumberFormat(undefined, {
  currency: 'USD',
  style: 'currency',
});

export const formatCurrency = (number: number) => {
  const formattedNumber = CURRENCY_FORMATTER.format(number);

  return `$${formattedNumber.replace('USD', '').trim()}`;
};

export type SearchParams = {
  [key: string]: string | string[] | null,
};

export enum SearchParameters {
  Sort = 'sort',
  PerPage = 'perPage',
}
