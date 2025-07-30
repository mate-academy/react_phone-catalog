import { Description } from '../../Components/Description';
import { TechSpecs } from '../../Components/TechSpecs';
import { UrlWay } from '../../Components/UrlWay';
import './ProductInfoPage.scss';
import { SliderForProduct } from '../../Components/SliderForProduct';
import { useGadget } from '../../hooks/useGadget';
import { LinkBack } from '../../Components/LinkBack';

import { ProductImageSlider } from '../../Components/ProductImageSlider';
import { useContext, useEffect } from 'react';
import { FavoriteContext } from '../../context/FavoriteContext';
import { CartContext } from '../../context/CartContext';
import { useNavigate } from 'react-router-dom';
import type { Product } from '../../types/products';
import { ColorPicker } from '../../ui/ColorPicker/ColorPicker';
import cn from 'classnames';
import { ButtonAdd } from '../../ui/ButtonAdd';
import { ButtonFavorite } from '../../ui/ButtonFavorite';
import { appleColors } from '../../constans/appleColors';
import { useTranslationState } from '../../stateManagers/languageState';
import { useThemeState } from '../../stateManagers/themeState';
import { SkeletonProductInfoPage } from '../../Components/SkeletonProductInfoPage';

export const ProductInfoPage = () => {
  const { category, itemId, loading, gadget, productsMayLike, gadgets } =
    useGadget();

  const { translate } = useTranslationState();
  const { theme } = useThemeState();

  const { productInCart, setProductInCart } = useContext(CartContext);
  const { productInFavorite, setProductInFavorite } =
    useContext(FavoriteContext);
  const navigate = useNavigate();

  const isInCart = productInCart.some(
    (product: Product) => product.itemId === gadget?.id,
  );
  const isInFavorite = productInFavorite.some(
    (product: Product) => product.itemId === gadget?.id,
  );

  const currentProduct = productsMayLike.find(
    (product: Product) => product.itemId === gadget?.id,
  );

  const handleAddToCart = () => {
    if (!currentProduct) {
      return;
    }
    setProductInCart(currentProduct);
  };
  const handleAddToFavorite = () => {
    if (!currentProduct) {
      return;
    }
    setProductInFavorite(currentProduct);
  };

  const selectedColor = gadget?.color;
  const selectedCapacity = gadget?.capacity;

  const handleChangeVariant = (
    color: string | undefined,
    capacity: string | undefined,
  ) => {
    if (!gadget) {
      return;
    }

    const found = gadgets.find(
      (g) => g.color === color && g.capacity === capacity,
    );

    if (found) {
      navigate(`/${category}/${found.id}`);
    }
  };

  const images = gadget?.images || [];
  const colors = gadget?.colorsAvailable || [];
  const capacities = gadget?.capacityAvailable || [];
  const price = gadget?.priceDiscount || gadget?.priceRegular;
  const oldPrice = gadget?.priceDiscount ? gadget.priceRegular : null;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [itemId]);

  return (
    <div className={`product-info-page product-info-page--${theme}`}>
      <UrlWay
        category={category}
        itemId={itemId}
      />
      <div className="product-info-top">
        <LinkBack />
      </div>
      {loading ?
        <SkeletonProductInfoPage />
      : <>
          <h2 className="product-info-title">{gadget?.name}</h2>

          <div className="product-info-main">
            <ProductImageSlider images={images} />

            <div className="product-info-aside">
              <div className="info-row">
                <span className="small-text">
                  {translate('Available colors')}
                </span>
                <span className="small-text id-mobile">
                  ID: {gadget?.namespaceId}
                </span>
              </div>

              <ColorPicker
                colors={colors}
                selectedColor={selectedColor || ''}
                onSelect={(color) =>
                  handleChangeVariant(color, selectedCapacity)
                }
                colorMap={appleColors}
              />

              <div className="divider" />

              <span className="small-text">{translate('Select Capacity')}</span>
              <div className="capacities">
                {capacities.map((capacity) => (
                  <button
                    key={capacity}
                    className={cn('capacity-button', {
                      selected: selectedCapacity == capacity,
                    })}
                    onClick={() => handleChangeVariant(selectedColor, capacity)}
                  >
                    {capacity}
                  </button>
                ))}
              </div>

              <div className="divider" />

              <div className="price-row">
                <h2>${price}</h2>
                {oldPrice && <span className="old">${oldPrice}</span>}
              </div>

              <div className="actions">
                <ButtonAdd
                  isActive={isInCart}
                  onClick={handleAddToCart}
                />
                <ButtonFavorite
                  isActive={isInFavorite}
                  onClick={handleAddToFavorite}
                />
              </div>

              <div className="shortspecs">
                <div className="shortspecs-row">
                  <span className="small-text">{translate('screen')}</span>
                  <span className="small-text shortspecs-value">
                    {gadget?.screen}
                  </span>
                </div>
                <div className="shortspecs-row">
                  <span className="small-text">{translate('resolution')}</span>
                  <span className="small-text shortspecs-value">
                    {gadget?.resolution}
                  </span>
                </div>
                <div className="shortspecs-row">
                  <span className="small-text">{translate('processor')}</span>
                  <span className="small-text shortspecs-value">
                    {gadget?.processor}
                  </span>
                </div>
                <div className="shortspecs-row">
                  <span className="small-text">{translate('ram')}</span>
                  <span className="small-text shortspecs-value">
                    {gadget?.ram}
                  </span>
                </div>
              </div>
            </div>

            <span className="small-text id-desktop">
              ID: {gadget?.namespaceId}
            </span>
          </div>

          <div className="product-info-details">
            <div className="div-for-grid-first">
              <h3>{translate('About')}</h3>
              <div className="divider" />
              <Description gadget={gadget} />
            </div>
            <div className="div-for-grid-second">
              <h3>{translate('Tech specs')}</h3>
              <div className="divider" />
              <TechSpecs gadget={gadget} />
            </div>
          </div>
        </>
      }

      <SliderForProduct
        visibleProducts={productsMayLike}
        title={translate('You may also like')}
        loading={loading}
      />
    </div>
  );
};
