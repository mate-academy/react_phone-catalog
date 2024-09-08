export enum CategoriesEnum {
  PHONES = 'phones',
  TABLETS = 'tablets',
  ACCESSORIES = 'accessories',
}

export interface CateroryItemsType {
  imagePath: string;
  link: string;
  title: CategoriesEnum;
  count: number;
}
