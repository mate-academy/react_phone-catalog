export const getFormattedCrumb = (crumb: string) => {
  const formattedCrumb = crumb.split('-')
    .map(part => part[0].toUpperCase() + part.slice(1))
    .join(' ');

  return formattedCrumb;
};
