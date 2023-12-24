import { ItemType } from '../Item';

export type ArrowDirection = 'left' | 'right';

export type Image = {
  id: number;
  url: string;
};

export type Error = {
  id: number;
  isError: boolean;
  type: PopUp;
  text: string;
};

export type PageItems = 'Phones' | 'Tablets' | 'Accessories' | '/';

export type PopUp = 'success' | 'warning';

export type ProductsPage = ItemType | 'favourite';

export type Sort = 'age' | 'price' | '-price' | 'name';

export type PerPage = '4' | '8' | '16' | 'all';

export type HistoryLink = { title: string; link: string | null };
