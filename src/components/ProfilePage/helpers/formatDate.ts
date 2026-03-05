export const formatDate = (isoDate: string): string => {
  try {
    return new Date(isoDate).toLocaleDateString('uk-UA', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  } catch {
    return isoDate;
  }
};
