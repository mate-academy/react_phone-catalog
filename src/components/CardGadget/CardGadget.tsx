/* eslint-disable max-len */
/* eslint-disable no-console */
import { Link, useSearchParams } from 'react-router-dom';
import { ButtonToCart } from '../ButtonToCart';
import { ButtonFavorite } from '../ButtonFavorite';
import { Gadget } from '../../support/types';

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
};

type Props = {
  item: Gadget;
};

export const CardGadget: React.FC<Props> = ({ item }) => {
  const [param] = useSearchParams();

  param.set('item', item.id);
  param.set('color', item.color || '');
  param.set('capacity', item.capacity);

  return (
    <div className="ease-linear duration-300 p-6 flex flex-col w-[272px] h-[507px] border border-elements box-border hover:border-secondary">
      <Link
        to={`../../${item.type}s?${param}`}
        onClick={scrollToTop}
      >
        <img
          src={item.imageUrl}
          alt={item.id}
          className="h-[208px] w-[208px] mb-6 self-center"
        />
      </Link>
      <h5 className="h5 font-regular text-sm">{`${item.name} ${item.color || 'Black'} ${item.capacity}`}</h5>
      <p className="h2 mb-2">
        <span className="pr-2 font-bold">
          {`$${item.price - (item.price / 100) * item.discount}`}
        </span>
        {item.discount > 0 ? (
          <span className=" font-bold inline-block text-secondary text-line-ivert relative mix-blend">{`$${item.price}`}</span>
        ) : (
          <></>
        )}
      </p>
      <div className="h-[1px] w-full bg-elements mb-4" />
      <p className="flex justify-between">
        <span className="font-regular text-xs  h6  flex items-center">
          Screen
        </span>
        <span className="font-regular text-xs">{item.screen}</span>
      </p>
      <p className="flex justify-between">
        <span className="font-regular text-xs h6  flex items-center">
          Capacity
        </span>
        <span className="font-regular text-xs">{item.capacity}</span>
      </p>
      <p className="flex justify-between">
        <span className=" font-regular text-xs h6  flex items-center">Ram</span>
        <span className=" font-regular text-xs">{item.ram}</span>
      </p>
      <div className="flex gap-x-2 mt-auto">
        <ButtonToCart itemID={item.id} />
        <ButtonFavorite itemID={item.id} />
      </div>
    </div>
  );
};
