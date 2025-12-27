import { Category } from '@/types/Category';

export interface CategoryUI {
  title: string;
  type: Category;
  preview: string;
  path: string;
  count?: number;
}
