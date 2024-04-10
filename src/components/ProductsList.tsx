import { twMerge } from 'tailwind-merge';
import { Product } from '../types/products';
import { ProductCard } from './ProductCard';

interface Props {
  cards: Product[];
  className?: string;
}

export const ProductsList: React.FC<Props> = ({ cards, className }) => {
  return (
    <div
      className={twMerge(
        `grid
        w-full grid-cols-[repeat(auto-fill,minmax(theme(width.68),1fr))]
        gap-10 gap-x-4`,
        className,
      )}
    >
      {cards.map(card => (
        <ProductCard className="w-full" key={card.id} product={card} />
      ))}
    </div>
  );
};
