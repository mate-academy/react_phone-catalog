interface CategoriesType {
  id: number;
  title: string;
  sort: string;
}

export const categoriesMap: CategoriesType[] = [
  {
    id: 1,
    title: 'Newest',
    sort: '-year',
  },
  {
    id: 2,
    title: 'Oldest',
    sort: 'year',
  },
  {
    id: 3,
    title: 'Alphabetically (A-Z)',
    sort: 'name',
  },
  {
    id: 4,
    title: 'Alphabetically (Z-A)',
    sort: '-name',
  },
  {
    id: 5,
    title: 'Cheapest',
    sort: 'price',
  },
  {
    id: 6,
    title: 'Expensive',
    sort: '-price',
  },
];
