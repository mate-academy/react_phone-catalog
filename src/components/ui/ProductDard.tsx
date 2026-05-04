import React from 'react';
import ButtonBox from './ButtonBox';
import { Product } from '../../types/itemTypes';
import { useNavigate } from 'react-router-dom';

type Props = {
  product: Product;
};

const ProductCard: React.FC<Props> = ({ product }) => {
  const navigate = useNavigate();

  const handlePageRedirection = () => {
    navigate(`/${product.category}/${product.itemId}`);
  };

  return (
    <div
      onClick={handlePageRedirection}
      className="lg:w-[272px] lg:h-[506px] cursor-pointer
        sm:w-[237px] sm:h-[512px] w-[212px] h-[439px]
        flex flex-col gap-2 font-mont p-8 text-center
        border   justify-between border-gray-200 "
    >
      <div
        className="w-[148px] h-[129px] sm:w-[173px]
       sm:h-[202px] lg:w-[208px] lg:h-[196px] p-0"
      >
        <img
          className="p-0 w-full h-full hover:scale-[1.1]
          transition-all object-contain m-0"
          src={`/${product.image}`}
          alt=""
        />
      </div>
      <h1
        className="text-sm text-gray-700
      font-semibold text-left"
      >
        {product.name}
      </h1>
      <div className="flex flex-col gap-2">
        <div className="flex gap-2 justify-start items-baseline">
          <h2 className="font-bold">{product.price}</h2>
          <h2 className="text-gray-400 line-through">{`$${product.fullPrice}`}</h2>
        </div>
        <div className="card__line-separator"></div>
        <div className="w-full h-[77px]  flex justify-between text-xs ">
          <div className="gap-2 text-gray-400 flex flex-col items-start">
            <p>Screen</p>
            <p>Capacity</p>
            <p>RAM</p>
          </div>
          <div className="gap-2 flex flex-col items-end">
            <p>{product.screen}</p>
            <p>{product.capacity}</p>
            <p>{product.ram}</p>
          </div>
        </div>
        <ButtonBox product={product} />
      </div>
    </div>
  );
};

export default ProductCard;
