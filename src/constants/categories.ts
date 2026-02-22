export const CATEGORIES = [
  {
    title: 'Phones',
    href: '/phones',
    image: {
      src: 'images/categories/phones.webp',
      alt: 'Phones category',
      bg: '#6d6474',
    },
  },
  {
    title: 'Tablets',
    href: '/tablets',
    image: {
      src: 'images/categories/tablets.webp',
      alt: 'Tablets category',
      bg: '#8d8d92',
    },
  },
  {
    title: 'Accessories',
    href: '/accessories',
    image: {
      src: 'images/categories/accessories.webp',
      alt: 'Accessories category',
      bg: '#973d5f',
    },
  },
] as const;

export type CategoriesType = typeof CATEGORIES;
