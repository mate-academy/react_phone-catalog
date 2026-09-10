import { Categories } from '@/types/Categories';
import { Link } from 'react-router-dom';

interface Props {
  children: React.ReactNode;
  category: Categories;
  itemId: string;
  className?: string;
}

export const DetailsLink = ({
  children,
  category,
  itemId,
  className,
}: Props) => {
  return (
    <Link to={`/${category}/${itemId}`} className={className}>
      {children}
    </Link>
  );
};
