import { twMerge } from 'tailwind-merge';
import { Product } from '../types/products';
import { Button } from './Button';
import { FavouritesButton } from './FavouritesButton';

interface Props {
  product: Product;
  discount?: boolean;
  className?: string;
}

export const ProductCard: React.FC<Props> = ({
  product,
  discount = true,
  className = '',
}) => {
  return (
    <article
      className={twMerge(
        `flex h-126.5 w-68 flex-col items-center gap-2 border
      border-elements p-8 hover:shadow-[0_2px_16px_0_rgba(0,0,0,0.102)]
        [&>*]:w-full`,
        className,
      )}
    >
      <img
        className="max-h-49 object-contain"
        src={product.image}
        alt={product.name}
      />
      <p className="mt-4 flex-1 overflow-hidden text-left">{product.name}</p>
      <div className="flex items-center justify-start gap-2">
        <h3 className="font-bold">${product.price}</h3>
        {product.price !== product.fullPrice && discount && (
          <h3 className="text-secondary line-through">${product.fullPrice}</h3>
        )}
      </div>
      <hr className="border-elements" />
      <div className="p-y-2 flex flex-col gap-2">
        <div className="flex justify-between">
          <small className="text-secondary">Screen</small>
          <small>{product.screen}</small>
        </div>
        <div className="flex justify-between">
          <small className="text-secondary">Capacity</small>
          <small>{product.capacity}</small>
        </div>
        <div className="flex justify-between">
          <small className="text-secondary">RAM</small>
          <small>{product.ram}</small>
        </div>
      </div>
      <div className="flex gap-2">
        <Button className="w-full">Add to cart</Button>
        <FavouritesButton className="h-10 w-10" />
      </div>
    </article>
  );
};
