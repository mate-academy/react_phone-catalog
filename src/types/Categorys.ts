export type CategorySrc = '/phones' | '/tablets' | '/accessories';

export type CategoryDates = {
  name: string;
  src: CategorySrc;
  pageName: string;
};

export const findCategoryDates = (src: CategorySrc): CategoryDates | null => {
  switch (src) {
    case '/phones':
      return { name: 'phones', src: '/phones', pageName: 'Mobile Phones' };

    case '/tablets':
      return { name: 'tablets', src: '/tablets', pageName: 'Tablets' };

    case '/accessories':
      return {
        name: 'accessories',
        src: '/accessories',
        pageName: 'Accessories',
      };
    default:
      return null;
  }
};
