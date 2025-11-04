import { CategoryItem } from '../../../i18next/types/CategoryItem';

export const getProductPageTitle = (
  category: string,
  source: CategoryItem[],
) => {
  // let pageTitle = '';
  return source.filter(title => title.category === category)[0].title;

  // switch (category) {
  //   case 'phones':
  //     pageTitle = source.find(title => title.category === category)?.title;
  //     break;
  //   case 'tablets':
  //     pageTitle = 'Tablets';
  //     break;
  //   case 'accessories':
  //     pageTitle = 'Accessories';
  //     break;
  //   default:
  //     '';
  // }

  // return pageTitle;
};
