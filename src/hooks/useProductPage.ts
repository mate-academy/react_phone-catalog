import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAppSelector } from './hookStore';
import { useTranslation } from 'react-i18next';
import { StrCode } from '../utils/enums';

type SortOptions = 'Newest' | 'Alphabetically' | 'Cheapest';

export const useProductPage = (
  variant: 'phones' | 'tabless' | 'accesories',
) => {
  const { t } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();

  const pageParam = searchParams.get('page') || 1;
  const perPageParam = searchParams.get('perPage') || '16';
  const searchParam = searchParams.get('search');

  const sortParamObj = {
    age: t(StrCode.SortAge),
    name: t(StrCode.SortName),
    price: t(StrCode.SortPrice),
  };

  const param = searchParams.get('sort');

  const sortParam = () => {
    if (param && param in sortParamObj) {
      return sortParamObj[param as keyof typeof sortParamObj];
    }

    return sortParamObj.age;
  };

  const { products } = useAppSelector(state => state.products);

  const [valueSort, setValueSort] = useState(sortParam());
  const [valuePerPage, setValuePerPage] = useState(perPageParam);
  const [currentPage, setCurrentPage] = useState(Number(pageParam));

  const updateCurrentPage = (value: number) => {
    searchParams.set('page', value.toString());
    setSearchParams(searchParams);
    setCurrentPage(value);
  };

  useEffect(() => {
    setValueSort(sortParam());
    setValuePerPage(perPageParam);
    setCurrentPage(Number(pageParam));
  }, [variant, param, perPageParam, pageParam, t]);

  const updateSort = (value: string) => {
    const valueChange = () => {
      switch (value) {
        case 'Newest':
          return 'age';
        case 'Новизною':
          return 'age';
        case 'Alphabetically':
          return 'name';
        case 'Назвою':
          return 'name';
        case 'Cheapest':
          return 'price';
        case 'Дешевизною':
          return 'price';
        default:
          return 'age';
      }
    };

    searchParams.set('sort', valueChange());
    searchParams.set('page', '1');
    setSearchParams(searchParams);
    setValueSort(value as SortOptions);
  };

  const updatePerPage = (value: string) => {
    searchParams.set('perPage', value);
    searchParams.set('page', '1');
    setSearchParams(searchParams);
    setValuePerPage(value);
  };

  const productsVariant = products.filter(item => {
    switch (variant) {
      case 'phones':
        return item.category === 'phones';
      case 'accesories':
        return item.category === 'accessories';
      case 'tabless':
        return item.category === 'tablets';
    }
  });

  const productsUsed = searchParam
    ? [...productsVariant].filter(item => {
        return item.name
          .replace(/\s+/g, '')
          .toLowerCase()
          .includes(searchParam.replace(/\s+/g, '').toLowerCase());
      })
    : [...productsVariant];

  const sortedAndPaginatedProducts = () => {
    const sortedProducts = [...productsUsed];

    switch (valueSort) {
      case 'Newest':
        sortedProducts.sort((a, b) => b.year - a.year);
        break;
      case 'Новизною':
        sortedProducts.sort((a, b) => b.year - a.year);
        break;
      case 'Alphabetically':
        sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'Назвою':
        sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'Cheapest':
        sortedProducts.sort((a, b) => a.price - b.price);
        break;
      case 'Дешевизною':
        sortedProducts.sort((a, b) => a.price - b.price);
        break;
      default:
        break;
    }

    if (valuePerPage === 'all') {
      return sortedProducts;
    } else {
      const perPage = Number(valuePerPage);
      const startIndex = (currentPage - 1) * perPage;
      const endIndex = startIndex + perPage;

      return sortedProducts.slice(startIndex, endIndex);
    }
  };

  const sordedProduct = sortedAndPaginatedProducts();
  const productsLength = productsUsed.length;
  const productsVariantLength = productsVariant.length;

  return {
    productsLength,
    productsVariantLength,
    valueSort,
    updateSort,
    valuePerPage,
    updatePerPage,
    sordedProduct,
    currentPage,
    updateCurrentPage,
  };
};
