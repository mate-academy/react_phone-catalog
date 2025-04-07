import { Product } from '@/types/Product'

type Props = {
  product: Product;
}

export const PhoneCard = ({ product }: Props) => {

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
      <img src={product.images[0]} alt={product.name} className="w-full h-[196px] object-contain mb-6" />

      <h3 className="text-text-color-base-white text-sm min-h-[41px] line-clamp-2 font-semibold leading-[20.5px] mb-2">{product.name}</h3>
      <p className="text-text-color-base-white text-lg font-bold mb-2">${product.priceRegular}</p>
      <div className='w-[208px] h-[1px] bg-color-arrow'></div>

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
        <button className="flex-1 bg-color-btn-purple hover:bg-color-btn-purple-hover text-text-color-base-white 
          py-[9.5px] px-[39.5px] text-sm font-bold
        ">
          Add to cart
        </button>
        <button className="w-10 h-10 border border-gray-600 flex items-center justify-center">
          <img src="icons/favourites.svg" alt="like" />
        </button>
      </div>
    </div>
  );
};
