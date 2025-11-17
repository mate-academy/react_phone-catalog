import { useState } from "react";

export const useAddToFavourite = () => {
  const [favourites, setFavourites] = useState<Set<string>>(new Set());
  const toggleFavourite = (phoneId: string) => {
    setFavourites(prev => {
      const newFavourites = new Set(prev);
      if (newFavourites.has(phoneId)) {
        newFavourites.delete(phoneId);
      } else {
        newFavourites.add(phoneId);
      }
      return newFavourites;
    });
  };

  return { favourites, toggleFavourite };
};

export default useAddToFavourite; 