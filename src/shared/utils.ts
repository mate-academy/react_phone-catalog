/* eslint-disable no-console */
import clsx, { type ClassValue } from 'clsx';

import { PaginatedResponse } from '@/shared/types';

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export const paginate = <T>(
  itemsAll: T[],
  page: number,
  size: number | 'all',
): PaginatedResponse<T> => {
  const total = itemsAll.length;
  const sizePerPage = size === 'all' ? total : size;

  const totalPages = Math.ceil(total / sizePerPage);
  const start = (page - 1) * sizePerPage;

  return {
    items: itemsAll.slice(start, start + sizePerPage),
    total,
    // page,
    //perPage,
    totalPages,
  };
};

export const getImageUrl = (image: string) => {
  const base = import.meta.env.BASE_URL.replace(/\/+$/, '');
  const path = image.replace(/^\/+/, '');

  return `${base}/${path}`;
};

export const scrollTopSmoothly = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
};
