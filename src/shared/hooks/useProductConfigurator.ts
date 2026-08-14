import { useEffect, useMemo, useState } from 'react';
import { useDetailsProduct } from './useDetailsProduct';
import { useNavigate } from 'react-router-dom';
import { Product } from '../types/Product';
import { getProducts } from './products';

export const useProductConfigurator = () => {
  const { product } = useDetailsProduct();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedColor] = useState<string | null>(null);
  const [allProducts, setAllProducts] = useState<Product[]>([]);

  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);

    const loadProducts = async () => {
      try {
        const data = await getProducts();

        setAllProducts(data);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Failed to fetch all products', error);
      }
    };

    loadProducts();
  }, []);

  const activeImage = selectedImage || product?.images[0];
  const activeColor = selectedColor || product?.color;
  const activeCapacity = product?.capacity;

  const colorsMap: Record<string, string> = {
    black: '#1f2020',
    spaceblack: '#1f2020',
    spacegray: '#535150',
    rosegold: '#f9d2d4',
    gold: '#f9e5c9',
    silver: '#ebebe3',
    white: '#f9f6ef',
    yellow: '#ffe681',
    coral: '#ee7762',
    red: '#ba0c2e',
    green: '#aee1cd',
    midnightgreen: '#4e5851',
    purple: '#d1cdda',
    blue: '#215e7c',
    sierrablue: '#bfd9e8',
    midnight: '#171e27',
    starlight: '#f0f2f2',
    pink: '#fae0d8',
  };

  const handleColorChange = (newColor: string) => {
    if (!product || !allProducts.length) {
      return;
    }

    const baseId = product.id.substring(0, product.id.lastIndexOf('-'));
    const idealNewId = `${baseId}-${newColor}`;

    const exactMatch = allProducts.find(item => item.itemId === idealNewId);

    if (exactMatch) {
      navigate(`/product/${exactMatch.itemId}`);

      return;
    }

    const nameWithoutCapacity = baseId.substring(0, baseId.lastIndexOf('-'));

    const fallbackMatch = allProducts.find(
      item =>
        item.itemId.includes(nameWithoutCapacity) &&
        item.itemId.endsWith(`-${newColor}`),
    );

    if (fallbackMatch) {
      navigate(`/product/${fallbackMatch.itemId}`);
    }
  };

  const handleCapacityChange = async (newCapacity: string) => {
    if (!product) {
      return;
    }

    const oldCap = product.capacity.toLowerCase();
    const newCap = newCapacity.toLowerCase();

    const idealNewId = product.id.replace(oldCap, newCap);

    const exactMatch = allProducts.find(item => item.itemId === idealNewId);

    if (exactMatch) {
      navigate(`/product/${exactMatch.itemId}`);

      return;
    }

    const baseModel = product.id.split(`-${oldCap}`)[0];

    const fallbackMatch = allProducts.find(
      item => item.itemId.includes(baseModel) && item.itemId.includes(newCap),
    );

    if (fallbackMatch) {
      navigate(`/product/${fallbackMatch.itemId}`);
    }
  };

  const recommendedProducts = useMemo(() => {
    if (!product || !allProducts.length) {
      return [];
    }

    const currentCategory =
      product.category ||
      allProducts.find(item => item.itemId === product.id)?.category;

    const sameCategoryProducts = allProducts.filter(
      item => item.category === currentCategory && item.itemId !== product.id,
    );

    const pool =
      sameCategoryProducts.length >= 4
        ? sameCategoryProducts
        : allProducts.filter(item => item.itemId !== product.id);

    return [...pool].sort(() => 0.5 - Math.random()).slice(0, 16);
  }, [product, allProducts]);

  return {
    colorsMap,
    handleColorChange,
    navigate,
    setSelectedImage,
    activeImage,
    activeColor,
    activeCapacity,
    handleCapacityChange,
    recommendedProducts,
  };
};
