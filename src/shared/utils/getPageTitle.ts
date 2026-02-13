import { PageTitle } from '../constants/pageTitle';

export const getPageTitle = (pathName: string) => {
  return Object.entries(PageTitle).reduce((acc, [key, i]) => {
    if (key.toLowerCase().includes(pathName)) {
      return acc + i;
    }

    return acc;
  }, '');
};
