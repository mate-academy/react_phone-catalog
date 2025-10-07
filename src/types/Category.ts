export enum CategoryType {
  Phones = 'phones',
  Tablets = 'tablets',
  Accessories = 'accessories',
}

export interface Category {
  category: CategoryType;
  title: string;
}
