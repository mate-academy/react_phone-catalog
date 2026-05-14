import { useCallback, useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import { useFetchProducts } from '../../features/products/useFetchProducts';
import { useProductDetails } from '../../features/products/useProductDetails';
import type { Product, ProductWithDetails } from '../../types/product';
import { scrollToTop } from '../../utils/scrollToTop';
import { useProductActions } from '../shared/hooks/useProductActions';
import { getDescriptionSections } from './descriptionUtils';
import {
  getProductCapacity,
  getProductNamespace,
  getProductOptionValues,
  getProductPrice,
  getProductSpecs,
  getProductWithHiddenDiscount,
  normalizeOption,
} from './productOptions';

interface ProductDetailsLocationState {
  hideDiscount?: boolean;
}

const isString = (value?: string): value is string => Boolean(value);
const SHORT_SPEC_KEYS: Array<keyof ProductWithDetails> = [
  'screen',
  'resolution',
  'processor',
  'ram',
];
const TECH_SPEC_KEYS: Array<keyof ProductWithDetails> = [
  'screen',
  'resolution',
  'ram',
  'capacity',
  'processor',
  'cell',
  'zoom',
  'camera',
  'year',
];

export const useProductDetailsPage = () => {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();
  const { state } = useLocation();
  const hideDiscount = Boolean((state as ProductDetailsLocationState | null)?.hideDiscount);

  const { products, isLoading } = useFetchProducts();
  const product = useMemo<Product | undefined>(() => {
    if (!productId) {
      return undefined;
    }

    return products.find(item => (item.itemId ?? String(item.id)) === productId);
  }, [products, productId]);

  const productForDetails = useMemo(
    () => getProductWithHiddenDiscount(product, hideDiscount),
    [hideDiscount, product],
  );
  const { mergedProduct: display, loading: detailsLoading } = useProductDetails(
    productForDetails ?? null,
  );

  const [selectedColor, setSelectedColor] = useState('');
  const [selectedCapacity, setSelectedCapacity] = useState<string | number>('');
  const [mainImage, setMainImage] = useState<string | undefined>();

  const currentItemId = String(product?.itemId ?? display?.itemId ?? display?.id ?? '');
  const cartProductBase = currentItemId
    ? (products.find(item => item.itemId === currentItemId) ?? product)
    : product;
  const { isInCart, isFavorited, handleCartClick, handleFavoriteClick } = useProductActions({
    product: cartProductBase,
    hideDiscount,
  });

  useEffect(() => {
    scrollToTop();
  }, [productId]);

  useEffect(() => {
    if (!display) {
      return;
    }

    setSelectedColor(display.colorsAvailable?.[0] ?? (display.color ? String(display.color) : ''));
    setSelectedCapacity(display.capacityAvailable?.[0] ?? display.capacity ?? '');
    setMainImage(display.images?.[0] ?? display.image);
  }, [display]);

  const namespace = display ? getProductNamespace(display) : '';
  const variantProducts = useMemo(() => {
    if (!display) {
      return [];
    }

    return products.filter(
      item => item.category === display.category && getProductNamespace(item) === namespace,
    );
  }, [display, namespace, products]);
  const selectedColorValue = String(display?.color ?? selectedColor);
  const selectedCapacityValue = String(display?.capacity ?? selectedCapacity);
  const { colors, capacities } = display
    ? getProductOptionValues(display)
    : { colors: [], capacities: [] };

  const findVariant = useCallback(
    (capacity: string | number, color: string) =>
      variantProducts.find(
        item =>
          normalizeOption(getProductCapacity(item)) === normalizeOption(capacity) &&
          normalizeOption(item.color) === normalizeOption(color),
      ),
    [variantProducts],
  );

  const goToVariant = useCallback(
    (capacity: string | number, color: string) => {
      const variant = findVariant(capacity, color);

      if (variant && variant.itemId !== currentItemId) {
        navigate(`/product/${variant.itemId}`, {
          replace: true,
          ...(hideDiscount ? { state: { hideDiscount: true } } : {}),
        });
      }
    },
    [currentItemId, findVariant, hideDiscount, navigate],
  );

  const price = display ? getProductPrice(display, hideDiscount) : null;
  const categoryPath = `/${display?.category ?? product?.category ?? 'phones'}`;

  return {
    state: {
      detailsLoading,
      display,
      isLoading,
      product,
      productId,
    },
    navigation: {
      navigateBack: () => navigate(categoryPath),
    },
    gallery: {
      images: (display?.images ?? [display?.image]).filter(isString),
      mainImage,
      setMainImage,
    },
    options: {
      capacities,
      colors,
      displayId: product?.id ?? display?.id ?? currentItemId,
      findVariant,
      goToVariant,
      selectedCapacityValue,
      selectedColorValue,
    },
    summary: {
      fullPriceValue: price?.fullPriceValue,
      handleCartClick,
      handleFavoriteClick,
      isFavorited,
      isInCart,
      priceValue: price?.priceValue,
      shortSpecs: display ? getProductSpecs(display, SHORT_SPEC_KEYS) : [],
    },
    content: {
      descriptionSections: getDescriptionSections(display?.description),
      techSpecs: display ? getProductSpecs(display, TECH_SPEC_KEYS) : [],
    },
    suggestions: {
      currentItemId,
      products,
    },
  };
};
