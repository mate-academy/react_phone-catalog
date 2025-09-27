export enum CategoryType {
  Phones = 'phones',
  Tablets = 'tablets',
  Accessories = 'accessories',
  Favourites = 'favourites',
}

export interface Category {
  category: CategoryType;
  title: string;
}
