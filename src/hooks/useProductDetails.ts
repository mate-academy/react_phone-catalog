import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  getCategoryDetails,
  getProductDetails,
  getProducts,
  getSuggestedProducts,
} from '../api/products';
import { Product, ProductDetails } from '../types/Product';

const normalizeColor = (color: string) =>
  color.toLowerCase().replace(/[\s-]/g, '');

export const useProductDetails = (itemId: string) => {
  const navigate = useNavigate();
  const [details, setDetails] = useState<ProductDetails | null>(null);
  const [product, setProduct] = useState<Product | null>(null);
  const [variants, setVariants] = useState<ProductDetails[]>([]);
  const [suggestions, setSuggestions] = useState<Product[]>([]);
  const [selectedImage, setSelectedImage] = useState(0);
  const [unavailableImages, setUnavailableImages] = useState<string[]>([]);
  const [loadedItemId, setLoadedItemId] = useState('');
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>(
    'loading',
  );
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    let active = true;

    setStatus('loading');
    setSelectedImage(0);
    setUnavailableImages([]);

    const load = async () => {
      try {
        const [newDetails, products, suggested] = await Promise.all([
          getProductDetails(itemId),
          getProducts(),
          getSuggestedProducts(itemId),
        ]);
        const categoryDetails = newDetails
          ? await getCategoryDetails(newDetails.category)
          : [];

        if (!active) {
          return;
        }

        setDetails(newDetails);
        setProduct(products.find(item => item.itemId === itemId) || null);
        setVariants(categoryDetails);
        setSuggestions(suggested);
        setLoadedItemId(itemId);
        setStatus('success');
      } catch {
        if (active) {
          setLoadedItemId(itemId);
          setStatus('error');
        }
      }
    };

    load();

    return () => {
      active = false;
    };
  }, [itemId, attempt]);

  const availableImages = details?.images.filter(
    image => !unavailableImages.includes(image),
  );
  const images = availableImages?.length
    ? availableImages
    : product
      ? [product.image]
      : [];
  const imageIndex = Math.min(selectedImage, images.length - 1);
  const markImageUnavailable = (image: string) => {
    setUnavailableImages(current =>
      current.includes(image) ? current : [...current, image],
    );
  };
  const family = details
    ? variants.filter(variant => variant.namespaceId === details.namespaceId)
    : [];
  const findVariant = (capacity: string, color: string) =>
    family.find(
      variant =>
        variant.capacity === capacity &&
        normalizeColor(variant.color) === normalizeColor(color),
    );
  const selectVariant = (capacity: string, color: string) => {
    const variant = findVariant(capacity, color);

    if (variant && variant.itemId !== itemId) {
      navigate(`/product/${variant.itemId}`);
    }
  };
  const summarySpecs = details
    ? [
        ['Screen', details.screen],
        ['Resolution', details.resolution],
        ['Processor', details.processor],
        ['RAM', details.ram],
      ]
    : [];
  const fullSpecs = details
    ? [
        ...summarySpecs,
        ['Built in memory', details.capacity],
        ...(details.camera ? [['Camera', details.camera]] : []),
        ...(details.zoom ? [['Zoom', details.zoom]] : []),
        ['Cell', details.cell.join(', ')],
      ]
    : [];

  return {
    details,
    product,
    suggestions,
    status,
    isLoading: status === 'loading' || loadedItemId !== itemId,
    reload: () => setAttempt(value => value + 1),
    images,
    imageIndex,
    selectImage: setSelectedImage,
    markImageUnavailable,
    findVariant,
    selectVariant,
    summarySpecs,
    fullSpecs,
  };
};
