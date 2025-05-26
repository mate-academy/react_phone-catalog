import { PerPage } from '../types/perPage';
import { RoutesLink } from '../types/routes';
import { SortTypes } from '../types/sort';

export const NAV_ITEMS = [
  {
    name: 'home',
    path: RoutesLink.HomePage,
  },
  {
    name: 'phones',
    path: RoutesLink.PhonesPage,
  },
  {
    name: 'tablets',
    path: RoutesLink.TabletsPage,
  },
  {
    name: 'accessories',
    path: RoutesLink.AccessoriesPage,
  },
];

export const CATEGORIES = [
  {
    name: 'Mobile phones',
    key: 'phones',
    img: 'img/category-phones.webp',
    backgroundColor: '#6D6474',
  },
  {
    name: 'Tablets',
    key: 'tablets',
    img: 'img/category-tablets.png',
    backgroundColor: '#8D8D92',
  },
  {
    name: 'Accessories',
    key: 'accessories',
    img: 'img/category-accessories.png',
    backgroundColor: '#973D5F',
  },
];

export const SORT_OPTIONS = [
  {
    label: 'Newest',
    value: SortTypes.Newest,
  },
  {
    label: 'Alphabetically',
    value: SortTypes.Alphabetically,
  },
  {
    label: 'Cheapest',
    value: SortTypes.Cheapest,
  },
];

export const ITEMS_PER_PAGE: { label: string; value: PerPage }[] = [
  { label: '4', value: 4 },
  { label: '8', value: 8 },
  { label: '16', value: 16 },
  { label: 'All', value: 'All' },
];

export const DEFAULT_SORT = SortTypes.Newest;
export const DEFAULT_PER_PAGE: PerPage = 'All';

export const BANNERS = [
  {
    title: 'iPhone 19 Pro MAX Turbo',
    description: 'Shoots so good, even your memories get jealous.',
    model: `${import.meta.env.BASE_URL}/models/iphone1.glb`,
  },
  {
    title: 'iPhone 19 Pro Power',
    description: 'So many features, even Siri asks for a break.',
    model: `${import.meta.env.BASE_URL}/models/iphone2.glb`,
  },
  {
    title: 'iPhone 19 Mega Super Power',
    description: 'Scans faces so deep it builds your family tree.',
    model: `${import.meta.env.BASE_URL}models/iphone3.glb`,
  },
];
