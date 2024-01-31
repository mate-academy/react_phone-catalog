import { useLocation } from "react-router-dom";
import { capitalize } from "../../utils/stringHelper";

type BreadCrumb = {
  link: string,
  name: string,
  isActive: boolean,
};

export const useBreadCrumbs = (): BreadCrumb[] => {
  const { pathname } = useLocation();

  if (pathname === '/') {
    return [];
  }

  const BreadCrumbsNames = pathname.slice(1).split('/');
  let currentPath = '';

  return BreadCrumbsNames.map(breadCrumbName => {
    currentPath += `/${breadCrumbName}`;

    return {
      name: capitalize(breadCrumbName.replace(/-/g, ' ')),
      link: currentPath,
      isActive: currentPath === pathname,
    };
  });
};
