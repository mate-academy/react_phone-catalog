import { Link } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';
import { Product } from '../types/product';
import { ButtonCard } from './ButtonCard';
import favoritesGoods from '../images/icons/favourites-goods.svg';

interface Props {
  discount?: boolean;
  className?: string;
  product: Product;
}

export const ProductCard: React.FC<Props> = ({
  className = '',
  product,
  discount = true,
}) => {
  const {
    itemId,
    name,
    fullPrice,
    price,
    screen,
    category,
    capacity,
    ram,
    image,
  } = product;

  return (
    <article
      className={twMerge(
        `flex h-126.5 w-68 flex-col gap-2 border border-elements p-8
        duration-300 hover:shadow-[0_3px_10px_rgb(0,0,0,0.2)] [&>*]:w-full`,
        className,
      )}
    >
      <Link to={`/${category}/${itemId}`} className="flex justify-center">
        <img
          src={image}
          alt="Phone"
          className="h-48 object-contain duration-500 hover:scale-105"
        />
      </Link>

      <p className="mt-4 flex-1 overflow-hidden">{name}</p>

      <div className="flex gap-2">
        <h4 className="text-1.5xl font-bold">${price}</h4>
        {discount && (
          <h4 className="text-1.5xl text-secondary line-through">
            ${fullPrice}
          </h4>
        )}
      </div>

      <hr className="h-px border-elements" />

      <ul className="flex flex-col gap-2 font-semibold">
        <li className="flex justify-between">
          <span className="text-secondary">Screen</span>
          <span>{screen}</span>
        </li>
        <li className="flex justify-between">
          <span className="text-secondary">Capacity</span>
          <span>{capacity}</span>
        </li>
        <li className="flex justify-between">
          <span className="text-secondary">RAM</span>
          <span>{ram}</span>
        </li>
      </ul>

      <div className="flex h-10 gap-2">
        <ButtonCard className="h-full w-full">Add to cart</ButtonCard>
        <ButtonCard
          className="flex aspect-square h-full items-center
            justify-center border border-icons bg-white"
        >
          <img src={favoritesGoods} alt="Favorites Good" />
        </ButtonCard>
      </div>
    </article>
  );
};
