import { useEffect, useState } from 'react';
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

  useEffect(() => {
    if (initialProduct) {
      setProduct(initialProduct);
      setSelectedColor(initialProduct.color);
      setSelectedCapacity(initialProduct.capacity);
      setMainImage(initialProduct.images[0]);
    }
  }, [initialProduct]);

  const handleColorChange = (color: string) => {
    setSelectedColor(color);

    if (!product) {
      return;
    }

    const found =
      allProducts.find(
        p =>
          p.namespaceId === product.namespaceId &&
          p.color === color &&
          p.capacity === selectedCapacity,
      ) ||
      allProducts.find(
        p => p.namespaceId === product.namespaceId && p.color === color,
      );

    if (found) {
      setProduct(found);
      setSelectedColor(found.color);
      setSelectedCapacity(found.capacity);
      setMainImage(found.images[0]);
    }
  };

  const handleCapacityChange = (capacity: string) => {
    setSelectedCapacity(capacity);

    if (!product) {
      return;
    }

    const found =
      allProducts.find(
        p =>
          p.namespaceId === product.namespaceId &&
          p.color === selectedColor &&
          p.capacity === capacity,
      ) ||
      allProducts.find(
        p => p.namespaceId === product.namespaceId && p.capacity === capacity,
      );

    if (found) {
      setProduct(found);
      setSelectedColor(found.color);
      setSelectedCapacity(found.capacity);
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
