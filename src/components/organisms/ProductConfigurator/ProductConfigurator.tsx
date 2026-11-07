import { useEffect, useState } from 'react';
import { SPECIFICATIONS } from '../../../constants/specifications';
import type { Product } from '../../../types/Product';
import type { Spec } from '../../../types/Specifications';
import { AvailableColors } from '../../molecules/AvailableColors/AvailableColors';
import { ProductCardSpecs } from '../../molecules/ProductCardSpecs/ProductCardSpecs';
import { ProductPrice } from '../../molecules/ProductPrice/ProductPrice';
import { ProductSelectActions } from '../../molecules/ProductSelectActions/ProductSelectActions';
import { SelectCapacity } from '../../molecules/SelectCapacity/SelectCapacity';
import { getScreenLabel } from '../../../utils/formatScreen';
import { ProductRating } from '../../atoms/ProductRating/ProductRating';
import { Typography } from '../../atoms/Typography/Typography';

type Props = {
  product: Product;
  isLiked: boolean;
  isSelected: boolean;
  handleColorSelect: (selecteColor: string) => void;
  handleCapacitySelect: (selectedCapacity: string) => void;
  handleAddToCart: () => void;
  handleLikeClick: () => void;
};

function getSpecifications(product: Product): Spec[] {
  return [
    [SPECIFICATIONS.SCREEN, getScreenLabel(product.screen)],
    [SPECIFICATIONS.RESOLUTION, product.resolution],
    [SPECIFICATIONS.PROCESSOR, product.processor],
    [SPECIFICATIONS.RAM, product.ram],
  ];
}

export const ProductConfigurator: React.FC<Props> = ({
  handleColorSelect,
  handleCapacitySelect,
  handleLikeClick,
  handleAddToCart,
  isLiked,
  isSelected,
  product,
}) => {
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsSmallScreen(window.innerWidth < 640);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  return (
    <div>
      <div className="flex flex-col gap-2 lg:w-[62.5%]">
        <Typography
          level="small"
          className="text-secondary "
        >
          Rating
        </Typography>
        <div className="border-b border-elements pb-6 ">
          <ProductRating product={product} />
        </div>
      </div>
      <AvailableColors
        colors={product.colorsAvailable}
        handleClick={handleColorSelect}
        isSelected={product.color}
        classNames="py-6"
      />
      <div className="lg:w-[62.5%]">
        <div className="py-6 border-y border-elements">
          <SelectCapacity
            availableCapacities={product.capacityAvailable}
            selectedCapacity={product.capacity}
            handleClick={handleCapacitySelect}
          />
        </div>
        <div className="py-8">
          <div className="pb-4">
            {product.priceDiscount ?
              <ProductPrice
                currentPrice={product.priceDiscount}
                oldPrice={product.priceRegular}
                currentPriceSize={isSmallScreen ? 'h1' : 'h2'}
              />
            : <ProductPrice
                currentPrice={product.priceRegular}
                currentPriceSize={isSmallScreen ? 'h1' : 'h2'}
              />
            }
          </div>
          <ProductSelectActions
            handleLikeClick={handleLikeClick}
            handleSelectClick={handleAddToCart}
            isSelected={isSelected}
            isLiked={isLiked}
          />
        </div>
        <ProductCardSpecs specifications={getSpecifications(product)} />
      </div>
    </div>
  );
};
