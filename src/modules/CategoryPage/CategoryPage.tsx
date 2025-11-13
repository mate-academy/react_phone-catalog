import { FC } from 'react';
import { Category } from '../../types/Product';

interface Props {
  category: Category;
}
export const CategoryPage: FC<Props> = ({ category }) => {
  return <section>{category}</section>;
};
