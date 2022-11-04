export const getPageName = (pathname: string): string => {
  const plainPageName = pathname.split('/')[1];
  const bigFirstLetter = plainPageName.slice(0, 1).toLocaleUpperCase();
  const pageName = bigFirstLetter + plainPageName.slice(1);

  return pageName;
};
