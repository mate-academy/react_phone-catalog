export const getSortBy = (t: (key: string) => string) => ({
  Newest: t('sortBy.0'),
  Alphabetically: t('sortBy.1'),
  Cheapeast: t('sortBy.2'),
});

export enum SortBy {
  Newest = 'Newest',
  Alphabetically = 'Alphabetically',
  Cheapeast = 'Cheapeast',
}
