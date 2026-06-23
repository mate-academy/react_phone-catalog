import { Category, PerPageOption, SortType } from '../types/catalog';

export const CATEGORY_LABELS: Record<Category, string> = {
  phones: 'Phones',
  tablets: 'Tablets',
  accessories: 'Accessories',
};

export const CATEGORY_EMPTY_LABELS: Record<Category, string> = {
  phones: 'phones',
  tablets: 'tablets',
  accessories: 'accessories',
};

export const SORT_OPTIONS: { label: string; value: SortType }[] = [
  { label: 'Newest', value: 'age' },
  { label: 'Alphabetically', value: 'title' },
  { label: 'Cheapest', value: 'price' },
];

export const PER_PAGE_OPTIONS: PerPageOption[] = [4, 8, 16, 'all'];

export const BANNER_SLIDES = [
  {
    image: '/img/banner-phones.png',
    eyebrow: 'Fresh arrivals',
    title: 'Pocket tech for every kind of upgrade',
    description:
      'Discover phones, tablets, and accessories ready for a fast browse.',
    cta: '/phones',
  },
  {
    image: '/img/banner-tablets.png',
    eyebrow: 'Work and unwind',
    title: 'Bigger screens, smoother ideas',
    description:
      'Browse powerful tablets for note-taking, drawing, streaming, and more.',
    cta: '/tablets',
  },
  {
    image: '/img/banner-accessories.png',
    eyebrow: 'Finishing touches',
    title: 'Accessories that make the setup feel complete',
    description:
      'From Apple Watch picks to daily add-ons, find the extras that do more.',
    cta: '/accessories',
  },
] as const;
