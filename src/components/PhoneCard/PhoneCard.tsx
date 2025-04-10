import { PhoneCardProps } from '@/types/Product'
import { Link } from 'react-router-dom';
import { useState } from 'react';


export const PhoneCard = ({ product, showDiscount = false }: PhoneCardProps) => {
  const [isSelectedFav, setIsSelectedFav] = useState(false);
  const [isSelectedBtn, setIsSelectedBtn] = useState(false);

  // take name in the field 'screen'
  const formatScreen = (screen: string) => {
    const screenMatch = screen.match(/([\d.]+)[’']?\s+([A-Za-z\s]*)/i);

    if (screenMatch) {
      const [, size, rawType] = screenMatch;
      const cleanedType = rawType
        .replace(/\b(display|XDR)\b/gi, '')
        .trim();

      return `${size}" ${cleanedType}`.trim();
    }

    return screen;
  };

  return (
    <div className="w-[272px] h-[506px] bg-[#161827] flex p-8 flex-col font-mont">
      <Link to={''}>
        <img src={product.images[0]} alt={product.name} className="w-full h-[196px] object-contain mb-6 transition-transform duration-300 hover:scale-110" />
      </Link>

      <h3 className="text-text-color-base-white text-sm min-h-[41px] line-clamp-2 font-semibold leading-[20.5px] mb-2">{product.name}</h3>
      <div className="flex gap-2 mb-2 text-[22px] items-baseline">
        <p className="text-text-color-base-white font-extrabold">
          ${showDiscount ? product.priceDiscount : product.priceRegular}
        </p>

        {showDiscount && product.priceDiscount < product.priceRegular && (
          <p className="text-text-color-base-grey font-semibold line-through">
            ${product.priceRegular}
          </p>
        )}
      </div>

      <div className='block w-[208px] h-[1px] bg-color-border'>
        &nbsp;
      </div>

      <ul className="text-xs text-gray-400 py-4">
        <li className="flex justify-between pb-2">
          <span>Screen</span>
          <span className="text-text-color-base-white">{formatScreen(product.screen)}</span>
        </li>
        <li className="flex justify-between pb-2">
          <span>Capacity</span>
          <span className="text-text-color-base-white">{product.capacity}</span>
        </li>
        <li className="flex justify-between">
          <span>RAM</span>
          <span className="text-text-color-base-white">{product.ram}</span>
        </li>
      </ul>

      <div className="flex gap-2">
        <button
          onClick={() => setIsSelectedBtn(!isSelectedBtn)}
          className={`flex-1 text-text-color-base-white 
            py-[9.5px] px-[39.5px] text-sm font-bold ${isSelectedBtn ? 'bg-background-color-btn' : 'bg-color-btn-purple hover:bg-color-btn-purple-hover'}
        `}>
          {isSelectedBtn ? 'Added' : 'Add to cart'}
        </button>
        <button
          onClick={() => setIsSelectedFav(!isSelectedFav)}
          className={`w-10 h-10 flex items-center justify-center ${isSelectedFav ? 'border border-color-border bg-transparent' : 'bg-background-color-btn hover:bg-background-color-btn-hover'}
             `}
        >
          <img
            src={isSelectedFav ? "icons/favourites-liked.svg" : "icons/favourites.svg"}
            alt="like" />
        </button>
      </div>
    </div>
  );
};
