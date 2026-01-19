import { matchPath } from 'react-router-dom';
import { ROUTES_CONFIG } from '../../constants/routes';
import { BreadcrumbItem } from '../../types/BreadcrumbItem';

export const buildBreadcrumbs = (pathname: string) =>
  ROUTES_CONFIG.map(route => {
    const match = matchPath({ path: route.path, end: false }, pathname);

    if (!match || route.breadcrumb?.hide) {
      return null;
    }

    const params = match.params as Record<string, string>;

    return {
      label: route.breadcrumb?.getLabel?.(params) ?? route.label,
      link: route.breadcrumb?.getLink?.(params) ?? route.path,
      icon: route.breadcrumb?.isIcon && route.icon,
    };
  }).filter(Boolean) as BreadcrumbItem[];
