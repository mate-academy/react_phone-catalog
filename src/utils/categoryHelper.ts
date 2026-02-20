type CategorySlug = 'phones' | 'tablets' | 'accessories';

export const VALID_CATEGORIES = ['phones', 'tablets', 'accessories'];

const CATEGORY_TITLES: Record<CategorySlug, string> = {
  phones: 'Mobile Phones',
  tablets: 'Tablets',
  accessories: 'Accessories',
};

export const getCategoryTitle = (slug: string | undefined): string => {
  if (!slug || !CATEGORY_TITLES[slug as CategorySlug]) {
    return 'Products';
  }

  return CATEGORY_TITLES[slug as CategorySlug];
};
