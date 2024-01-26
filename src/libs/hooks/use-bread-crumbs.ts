import { useLocation } from 'react-router-dom';
import { PATH_SEPARATOR } from '../enums';
import { getCapitalizedString } from '../helpers';
import { BreadCrumbType } from '../types';

type UseBreadCrumbsType = (root?: BreadCrumbType) => BreadCrumbType[];

export const useBreadcrumbs: UseBreadCrumbsType = (root) => {
  const { pathname } = useLocation();

  const breadCrumbs = pathname.split(PATH_SEPARATOR)
    .reduce((breadcrumbs, pathPart, index, array) => {
      if (pathPart === '') {
        return breadcrumbs;
      }

      const pathSlice = array.slice(0, index + 1).join(PATH_SEPARATOR);

      return [...breadcrumbs, {
        title: getCapitalizedString(pathPart),
        path: `${pathSlice}`,
      }];
    }, [] as BreadCrumbType[]);

  return root ? [root, ...breadCrumbs] : breadCrumbs;
};
