import { StateStyles } from '../type/StateStyleSlider';

export const HOT_PRICE_SLIDER: StateStyles = {
  itemWidth: 272,
  frameSize: 4,
  step: 1,
  animationDuration: 1000,
  infinity: true,
  gap: 16,
};

export const SORT_BY = [
  {
    id: 'age',
    title: 'Newest',
  },
  {
    id: 'name',
    title: 'Alphabetically',
  },
  {
    id: 'price',
    title: 'Cheapest',
  },
];

export const ITEMS_ON_PAGE = [
  {
    id: '4',
    title: '4',
  },
  {
    id: '8',
    title: '8',
  },
  {
    id: '16',
    title: '16',
  },
  {
    id: 'all',
    title: 'All',
  },
];
