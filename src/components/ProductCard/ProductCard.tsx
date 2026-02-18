import { useFavourites } from '@/store/FavouritesContext';
import { Product } from '@/types/Product';
import { Card, Image, Button } from '@heroui/react';
import { Link } from 'react-router-dom';
import { HeartIcon } from '@phosphor-icons/react';
import { useCart } from '@/store/CartContext';
import { useMemo } from 'react';
import React from 'react';

type Props = {
  product: Product;
};

export const ProductCard: React.FC<Props> = ({ product }) => {
  const { isFavourite, toggleFavourite } = useFavourites();
  const { addToCart, cartItems } = useCart();
  const fav = isFavourite(product.itemId);

  const inCartProductCounts = useMemo(() => {
    if (!product) {
      return false;
    }

    return cartItems[product.itemId];
  }, [product?.itemId, cartItems]);

  console.log(product.image);

  return (
    <Card
      as="div"
      isPressable={false}
      key={product.id}
      shadow="sm"
      className="h-auto min-h-[440px] sm:min-h-[504px] border-gray-600 rounded-small p-7 shadow-md hover:shadow-lg transition text-[#0F0F11]"
    >
      <div className="flex justify-center mb-6">
        <Link to={`/${product.category}/${product.itemId}`} className="block">
          <Image
            as="img"
            shadow="none"
            radius="lg"
            width="100%"
            alt={product.name}
            className="w-full object-contain h-32 sm:h-49"
            src={`/${product.image}`}
          />
        </Link>
      </div>

      <Link to={`/${product.category}/${product.itemId}`}>
        <h3 className="text-sm mb-3">{product.name}</h3>
      </Link>

      <div className="flex items-center gap-3 pb-2 mb-4 text-[22px] border-b-1 border-gray-200">
        <span className="font-bold">${product.price}</span>
        {product.fullPrice && (
          <span className="text-[#89939A] leading-[21px] line-through">
            ${product.fullPrice}
          </span>
        )}
      </div>

      {/* Specs */}
      <div className="flex flex-col gap-2 text-xs font-semibold mb-3">
        <div className="flex justify-between w-full">
          <span className="text-[#89939A]">Screen</span>
          <span>{product.screen}</span>
        </div>
        <div className="flex justify-between w-full">
          <span className="text-[#89939A]">Capacity</span>
          <span>{product.capacity}</span>
        </div>
        <div className="flex justify-between w-full">
          <span className="text-[#89939A]">RAM</span>
          <span>{product.ram}</span>
        </div>
      </div>

      <div className="flex items-center justify-between w-full gap-2">
        {inCartProductCounts ? (
          <Button
            variant="bordered"
            radius="full"
            disabled
            className="h-10 w-[176px] sm:w-[118px] flex-1 bg-white text-[#4219d0]"
          >
            Added to cart
          </Button>
        ) : (
          <Button
            variant="bordered"
            radius="full"
            className="w-[176px] sm:w-[118px] flex-1 bg-[#4219d0] text-white"
            onPress={() => addToCart(product.itemId)}
          >
            Add to Card
          </Button>
        )}

        <Button
          isIconOnly
          variant="bordered"
          radius="full"
          className="border-gray-300"
          onPress={() => toggleFavourite(product.itemId)}
        >
          {fav ? (
            <HeartIcon size={16} color="#f4ba47" weight="fill" />
          ) : (
            <HeartIcon size={16} weight="bold" />
          )}
        </Button>
      </div>
    </Card>
  );
};
