/* eslint-disable max-len */
import { typographyStyle } from '../CustomStyles/Typography';
import { ProductType } from '../Types/ProductType';
import { FavouritesButton } from './FavouritesButton';

type Props = {
  product: ProductType;
};

export const ProductCard: React.FC<Props> = ({ product }) => {
  return (
    <div className="flex w-[272px] flex-col border border-Elements p-6 transition-all hover:border hover:border-Primary">
      <img
        className="h-[208px] w-[208px] self-center object-contain"
        src={`_new/${product.image}`}
        alt=""
      />

      <hr className="h-6 border-0" />

      <p
        className={`flex h-[42px] w-[224px] items-center ${typographyStyle.bodyText}`}
      >
        {product.name}
      </p>

      <hr className="h-2 border-0" />

      <div className={`flex gap-2 ${typographyStyle.h2}`}>
        <div className="font-bold leading-[140%] ">
          $
          {product.price}
        </div>
        <div className="relative font-medium text-Secondary line-through ">
          $
          {product.fullPrice}
        </div>
      </div>

      <hr className="mb-4 mt-2 border" />

      <div className={`mb-2 flex justify-between ${typographyStyle.button}`}>
        <div className="text-Secondary">Screen</div>
        <div>{product.screen}</div>
      </div>
      <div className={`mb-2 flex justify-between ${typographyStyle.button}`}>
        <div className="text-Secondary">Capacity</div>
        <div>{product.capacity}</div>
      </div>
      <div className={`flex justify-between ${typographyStyle.button}`}>
        <div className="text-Secondary">RAM</div>
        <div>{product.ram}</div>
      </div>

      <hr className="mb-4 border-0" />

      <div className={`flex gap-2 ${typographyStyle.button}`}>
        <button
          className="h-10 w-[176px] bg-Primary shadow-Primary transition-all hover:shadow-button-hover"
          type="button"
        >
          <span className="text-white">Add to cart</span>
        </button>

        <FavouritesButton />
      </div>
    </div>
  );
};
