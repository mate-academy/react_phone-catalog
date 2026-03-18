import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Divider } from '../Divider';
import { ProductColors } from '../ProductColors';
import { ProductCapacity } from '../ProductCapacity';
import { Price } from '../Price';
import { AddToCart } from '../Buttons/AddToCart';
import { AddToFavorite } from '../Buttons/AddToFavorite';
import { SpecsList } from '../SpecsList';
import { useProducts } from '../../hooks/useProducts';
import { useFavorite } from '../../hooks/useFavorite';
import { useCart } from '../../hooks/useCart';
import { isItemInCart } from '../../utils/isItemInCart';
import { buildProductPath } from '../../utils/buildProductPath';
import { ExtendedProduct } from '../../types/ExtendedProduct';
import { SpecItem } from '../../types/SpecItem';
import style from './ProductSpec.module.scss';

type Props = {
  product: ExtendedProduct;
  ExtendedProductList: ExtendedProduct[];
};

export const ProductSpec: React.FC<Props> = ({
  product,
  ExtendedProductList,
}) => {
  const { productsList } = useProducts();
  const { favoriteProducts, toggleFavorite } = useFavorite();
  const { cartList, addToCart } = useCart();

  const navigate = useNavigate();

  const currentProduct = productsList.find(p => p.itemId === product.id);
  const isInCart = isItemInCart(cartList, currentProduct?.itemId || '');

  const isFavorite = favoriteProducts.some(
    fav => fav.itemId === currentProduct?.itemId,
  );

  const { resolution, processor, screen, ram, priceDiscount, priceRegular } =
    product;

  const colorVariants = useMemo(
    () =>
      ExtendedProductList.filter(p => p.namespaceId === product.namespaceId) ||
      [],
    [ExtendedProductList, product.namespaceId],
  );

  const capacityVariants = useMemo(
    () =>
      ExtendedProductList.filter(
        p => p.namespaceId === product.namespaceId && p.color === product.color,
      ) || [],
    [ExtendedProductList, product.namespaceId, product.color],
  );

  const handleNavagate = (id: string) => {
    navigate(buildProductPath(product.category, id));
  };

  const handleFavoriteClick = () => {
    if (!currentProduct) {
      return;
    }

    toggleFavorite(currentProduct);
  };

  const handleAddToCartClick = () => {
    if (!currentProduct) {
      return;
    }

    addToCart(currentProduct);
  };

  const mainSpecs: SpecItem[] = [
    { label: 'product.screen', value: screen },
    { label: 'product.resolution', value: resolution },
    { label: 'product.processor', value: processor },
    { label: 'product.ram', value: ram },
  ];

  return (
    <div className={style.productSpec}>
      <p className={style.productId}>ID: {currentProduct?.id}</p>

      <div className={style.productSpecContent}>
        <ProductColors
          product={product}
          variants={colorVariants}
          onChange={handleNavagate}
        />

        <Divider />

        <ProductCapacity
          product={product}
          variants={capacityVariants}
          onChange={handleNavagate}
        />

        <Divider />

        <div className={style.priceAndButtonsContent}>
          <Price
            price={priceDiscount}
            fullPrice={priceRegular}
            hasDiscount
            fontSize={32}
          />

          <div className={style.buttons}>
            <AddToCart isInCart={isInCart} handleClick={handleAddToCartClick} />

            <AddToFavorite
              size={48}
              isFavorite={isFavorite}
              handleClick={handleFavoriteClick}
            />
          </div>
        </div>

        <div className={style.mainSpecsSection}>
          <SpecsList specs={mainSpecs} fontSize={12} />
        </div>
      </div>
    </div>
  );
};
