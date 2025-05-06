import { useSelector } from 'react-redux';
import { RootState } from '@/store';

export const FavouriteIconWithCounter = () => {
  const count = useSelector((state: RootState) => state.favourites.items.length);

  return (
    <div className="relative hover:scale-125 transition-all">
      <img src="icons/favourites.svg" alt="favourites" />
      {count > 0 && (
        <span className="font-mont font-bold absolute -top-[6px] -right-[7px] bg-[#EB5757] text-text-color-base-white text-[10px] w-[14px] h-[14px] rounded-full flex items-center justify-center">
          {count}
        </span>
      )}
    </div>
  );
};
