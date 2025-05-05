import { useState } from 'react';
import { ButtonProps } from '@/types/Product';

export const Buttons = ({
  cartButtonClassName = '',
  favButtonClassName = '',
}: ButtonProps) => {
  const [isSelectedFav, setIsSelectedFav] = useState(false);
  const [isSelectedBtn, setIsSelectedBtn] = useState(false);

  return (
    <div className="flex gap-2">
      <button
        onClick={() => setIsSelectedBtn(!isSelectedBtn)}
        className={`flex-1 text-text-color-base-white 
                py-[9.5px] px-[39.5px] text-sm leading-[21px] font-bold ${isSelectedBtn ? 'bg-background-color-btn' : 'bg-color-btn-purple hover:bg-color-btn-purple-hover'}
                ${cartButtonClassName}
        `}
      >
        {isSelectedBtn ? 'Added' : 'Add to cart'}
      </button>
      <button
        onClick={() => setIsSelectedFav(!isSelectedFav)}
        className={`w-10 h-10 flex items-center justify-center ${isSelectedFav ? 'border border-color-border bg-transparent' : 'bg-background-color-btn hover:bg-background-color-btn-hover'}
                ${favButtonClassName}
             `}
      >
        <img
          src={
            isSelectedFav
              ? 'icons/favourites-liked.svg'
              : 'icons/favourites.svg'
          }
          alt="like"
        />
      </button>
    </div>
  );
};
