import { useState } from 'react';
import { PhoneDetails } from '../interfaces/PhoneDetailsInterface';

export const useProductSelection = (
  initialProduct: PhoneDetails | null,
  allProducts: PhoneDetails[],
) => {
  const [product, setProduct] = useState<PhoneDetails | null>(initialProduct);
  const [selectedColor, setSelectedColor] = useState(
    initialProduct?.color || '',
  );
  const [selectedCapacity, setSelectedCapacity] = useState(
    initialProduct?.capacity || '',
  );
  const [mainImage, setMainImage] = useState(initialProduct?.images[0] || '');

  const handleColorChange = (color: string) => {
    setSelectedColor(color);

    const found = allProducts.find(
      p => p.color === color && p.capacity === selectedCapacity,
    );

    if (found) {
      setProduct(found);
      setSelectedCapacity(found.capacity);
      setMainImage(found.images[0]);
    }
  };

  const handleCapacityChange = (capacity: string) => {
    setSelectedCapacity(capacity);

    const found = allProducts.find(
      p => p.color === selectedColor && p.capacity === capacity,
    );

    if (found) {
      setProduct(found);
      setMainImage(found.images[0]);
    }
  };

  return {
    product,
    selectedColor,
    selectedCapacity,
    mainImage,
    setMainImage,
    handleColorChange,
    handleCapacityChange,
  };
};
