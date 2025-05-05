import { PhoneCardProps } from '@/types/Product';
import { Link } from 'react-router-dom';
import { Buttons } from '@/components/Buttons';

export const PhoneCard = ({
  product,
  showDiscount = false,
}: PhoneCardProps) => {
  const formatScreen = (screen: string) => {
    const screenMatch = screen.match(/([\d.]+)[’']?\s+([A-Za-z\s]*)/i);

    if (screenMatch) {
      const [, size, rawType] = screenMatch;
      const cleanedType = rawType.replace(/\b(display|XDR)\b/gi, '').trim();

      return `${size}" ${cleanedType}`.trim();
    }

    return screen;
  };

  return (
    <div className="w-[272px] h-[506px] bg-[#161827] flex p-8 flex-col font-mont">
      <Link to={`/phones/${product.id}`}>
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-[196px] object-contain mb-6 transition-transform duration-300 hover:scale-110"
        />
      </Link>

      <h3 className="text-text-color-base-white text-sm min-h-[41px] line-clamp-2 font-semibold leading-[20.5px] mb-2">
        {product.name}
      </h3>
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

      <div className="block w-[208px] h-[1px] bg-color-border">&nbsp;</div>

      <ul className="text-xs text-gray-400 py-4">
        <li className="flex justify-between pb-2">
          <span>Screen</span>
          <span className="text-text-color-base-white">
            {formatScreen(product.screen)}
          </span>
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
      <Buttons />
    </div>
  );
};
