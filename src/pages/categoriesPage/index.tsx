import { Category } from '@shared/types/APITypes';
import { CategoriesProvider } from './model';
import { CategoriesContent } from './ui/CategoriesContent';

type Props = {
  category: Category;
};

export const CategoriesPage = ({ category }: Props) => {
  return (
    <CategoriesProvider category={category}>
      <CategoriesContent />
    </CategoriesProvider>
  );
};
