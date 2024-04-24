import { Link } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';
import { useLocalStorage } from 'usehooks-ts';
import { ButtonCard } from './ButtonCard';
import { BasketGoods, Product } from '../types/product';
import favouriteGoods from '../images/icons/favourites-goods.svg';
import favouriteActive from '../images/icons/favourites-active.svg';
import { useNotification } from '../hooks/useNotification';

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
  const { addNotification } = useNotification();
  const [favourites, setFavourites] = useLocalStorage<Product['itemId'][]>(
    'favourites',
    [],
  );
  const [basket, setBasket] = useLocalStorage<BasketGoods[]>('basketGoods', []);

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

  const handleToggleFavourites = () => {
    if (favourites.includes(itemId)) {
      addNotification('removeFromFavourite');
      setFavourites(favourites.filter(item => item !== itemId));
    } else {
      addNotification('addToFavourite');
      setFavourites([...favourites, itemId]);
    }
  };

  const handleToggleBasket = () => {
    if (basket.some(item => item.id === product.itemId)) {
      addNotification('removeFromBasket');
      setBasket(c => c.filter(item => item.id !== product.itemId));
    } else {
      addNotification('addToBasket');
      setBasket(c => [...c, { id: product.itemId, quantity: 1 }]);
    }
  };

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

      <p className="mt-4 flex-1 overflow-hidden leading-[1.2]">{name}</p>

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
        <ButtonCard
          className={twMerge(
            'h-full w-full transition-all duration-300',
            basket.some(item => item.id === itemId) &&
              'border border-elements bg-white text-green',
          )}
          onClick={handleToggleBasket}
        >
          {basket.some(item => item.id === itemId) ? 'Selected' : 'Add to cart'}
        </ButtonCard>

        <ButtonCard
          className="flex aspect-square h-full items-center
            justify-center border border-icons bg-white"
          onClick={handleToggleFavourites}
        >
          <img
            src={favourites.includes(itemId) ? favouriteActive : favouriteGoods}
            alt="Favorites Good"
          />
        </ButtonCard>
      </div>
    </article>
  );
};
