import { AllAvailablePages } from './allAvailablePages';
import { Category } from './Category';

export type Item = {
  name: Category;
  id: number;
  path: AllAvailablePages;
};
