import type { Navigate } from '../types/Navigate';
import { getLinksClass } from '../hooks/getLinks';

export const navigation: Navigate[] = [
  {
    id: 0,
    to: '/',
    class: getLinksClass,
    label: 'HOME',
  },
  {
    id: 1,
    to: '/phones',
    class: getLinksClass,
    label: 'PHONES',
  },
  {
    id: 2,
    to: '/tablets',
    class: getLinksClass,
    label: 'TABLETS',
  },
  {
    id: 3,
    to: '/accessories',
    class: getLinksClass,
    label: 'ACCESSORIES',
  },
];
