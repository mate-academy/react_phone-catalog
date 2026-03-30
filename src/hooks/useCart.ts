//hooks
import { useContext, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';

//types
import { ProductDetailed } from '../types/product';

//services
import { CartContext } from '../services/CartContext';

export const useCart = (id: string | null) => {
  const { cart, setCart } = useContext(CartContext)!;
  const [isCheckingCart, setIsCheckingCart] = useState<boolean>(false);
  const queryClient = useQueryClient();

  const inCart = id ? cart.includes(id) : false;

  const toggleCart = async (e: React.MouseEvent) => {
    e.stopPropagation();

    if (!id) {
      return;
    }

    setIsCheckingCart(true);

    const products = await queryClient.fetchQuery<ProductDetailed[]>({
      queryKey: ['products'],
    });

    setIsCheckingCart(false);

    const productExists = products?.some((p: ProductDetailed) => p.id === id);

    if (!productExists) {
      alert('Product does not exist');

      return;
    }

    setCart(prev => (inCart ? prev.filter(el => el !== id) : [...prev, id]));
  };

  return { inCart, toggleCart, isCheckingCart };
};
