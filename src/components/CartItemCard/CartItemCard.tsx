/* eslint-disable max-len */
import { useCart } from '../../store/CartContext';
import { Product } from '../../types/Product';
import { Card, CardBody, Image, Button } from '@heroui/react';
import { MinusIcon, PlusIcon, XIcon } from '@phosphor-icons/react';
import React from 'react';
import { Link } from 'react-router-dom';
import { getImage } from '../../store/getImage';

export default function CartItemCard({ item }: { item: Product }) {
  const { removeFromCart, increment, decrement, cartItems } = useCart();

  return (
    <Card className="w-full shadow-sm h-40 sm:h-32">
      <CardBody className="px-6 py-4">
        <div
          className="w-full flex flex-col justify-between sm:flex-row 
          h-40 sm:h-32 gap-6"
        >
          <div className="flex items-center sm:flex-2/3 gap-4">
            {/* Remove Button */}
            <button onClick={() => removeFromCart(item.itemId)} className="text-gray-400 hover:text-[#0F0F11]">
              <XIcon size={18} />
            </button>

            {/* Image */}
            <Link to={`/${item.category}/${item.itemId}`} className="block h-[66px] w-[66px]">
              <Image src={getImage(item.image)} alt={item.name} className="h-[66px] w-[66px] rounded-lg object-contain" />
            </Link>
            {/* Product Info */}
            <div>
              <Link to={`/${item.category}/${item.itemId}`} className="block">
                <p className="text-sm">{item.name}</p>
              </Link>
            </div>
          </div>

          <div className="flex items-center justify-between sm:flex-1/3">
            {/* Quantity Controls */}
            <div className="flex items-center">
              <Button
                isIconOnly
                size="sm"
                variant="bordered"
                className="border-gray-300 rounded-full
                hover:border-gray-900"
                onPress={() => decrement(item.itemId)}
              >
                <MinusIcon size={14} />
              </Button>
              <div className="flex justify-center items-center h-8 w-8">
                <span className="text-base">{cartItems[item.itemId]}</span>
              </div>

              <Button
                isIconOnly
                size="sm"
                variant="bordered"
                className="border-gray-300 rounded-full hover:border-gray-900"
                onPress={() => increment(item.itemId)}
              >
                <PlusIcon size={14} weight="bold" />
              </Button>
            </div>

            {/* Price */}
            <p className="text-xl font-bold">${item.price}</p>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}
