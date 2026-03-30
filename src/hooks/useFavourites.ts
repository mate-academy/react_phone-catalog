import { useContext, useState } from 'react';
import { FavouritesContext } from '../services/FavouritesContext';
import { useQueryClient } from '@tanstack/react-query';
import { ProductDetailed } from '../types/product';

export const useFavourites = (id: string | null) => {
  const { favourites, setFavourites } = useContext(FavouritesContext)!;
  const [isCheckingFav, setIsCheckingFav] = useState<boolean>(false);
  const queryClient = useQueryClient();

  const inFav = id ? favourites.includes(id) : false;

  const toggleFavourites = async (e: React.MouseEvent) => {
    e.stopPropagation();

    if (!id) {
      return;
    }

    setIsCheckingFav(true);

    const products = await queryClient.fetchQuery<ProductDetailed[]>({
      queryKey: ['products'],
    });

    setIsCheckingFav(false);

    const productExists = products?.some((p: ProductDetailed) => p.id === id);

    if (!productExists) {
      alert('Product does not exist');

      return;
    }

    setFavourites(prev =>
      inFav ? prev.filter(el => el !== id) : [...prev, id],
    );
  };

  return { inFav, toggleFavourites, isCheckingFav };
};
