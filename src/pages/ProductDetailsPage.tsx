import { Breadcrumbs } from '../components/Breadcrumbs/Breadcrumbs';
import { ProductGallery } from '../components/ProductGallery/ProductGallery';
import { ColorSelector } from '../components/ColorSelector/ColorSelector';
import { CapacitySelector } from '../components/CapacitySelector/CapacitySelector';
import { FavoriteButton } from '../components/FavoriteButton/FavoriteButton';
import { ProductSlider } from '../components/ProductsSlider/ProductsSlider';
import { ButtonMain } from '../components/ButtonMain';
import { Loader } from '../components/Loader';
import { useNavigate, useParams } from 'react-router-dom';
import { useProductsWithDetails } from '../context/ProductsWithDetailsContext';
import type { ColorKey } from '../types/ColorKey';
import { ErrorMessage } from '../components/ErrorMessage';

import { useLanguage } from '../context/language/useLanguage';
import { productDetailsDictionary } from '../i18n/productDetailsDictionary';
import type { ProductDetailsDictionary } from '../i18n/productDetailsDictionary';
import { useLoading } from '../hooks/useLoading';
import { useState } from 'react';

interface Params {
  [key: string]: string | undefined;
  category?: string;
  itemId?: string;
}

export const ProductDetailsPage = () => {
  const allProducts = useProductsWithDetails();
  const { category, itemId } = useParams<Params>();
  const navigate = useNavigate();

  const { currentLanguage } = useLanguage();
  const translations: ProductDetailsDictionary =
    productDetailsDictionary[currentLanguage];

  const { isLoading, errors } = useLoading();
  const currentProduct = allProducts.find(p => p.details?.id === itemId);
  const imagesForGallery = currentProduct?.details?.images || [];
  const availableColors: ColorKey[] =
    currentProduct?.details?.colorsAvailable || [];
  const availableCapacities = currentProduct?.details?.capacityAvailable || [];
  const [showMessage, setShowMessage] = useState(false);

  const selectedColor = currentProduct?.color || '';
  const selectedCapacity = currentProduct?.capacity || '';

  const recommendedProducts = allProducts
    .filter(
      p =>
        p.itemId !== currentProduct?.itemId &&
        p.category === currentProduct?.category,
    )
    .slice(0, 10);

  const sliderConfig = {
    titleForBrand: translations.youMayAlsoLike,
    marginTop: 'mt-16',
  };

  const handleSelectColor = (color: string) => {
    const base = currentProduct?.itemId.split('-').slice(0, -2).join('-');
    if (!base) return;

    const targetProduct = allProducts.find(
      p =>
        p.color.replace(' ', '-') === color &&
        p.capacity === selectedCapacity &&
        p.itemId.includes(base),
    );

    if (targetProduct) {
      navigate(`/${targetProduct.category}/${targetProduct.itemId}`);
    } else {
      setShowMessage(true);
    }
  };

  const handleSelectCapacity = (capacity: string) => {
    const base = currentProduct?.itemId
      .split('-')
      .filter(item => {
        let colorParts;
        if (currentProduct.color.includes('-')) {
          colorParts = currentProduct.color.toLowerCase().split('-');
        } else {
          colorParts = currentProduct.color.toLowerCase().split(' ');
        }
        return (
          item !== currentProduct.capacity.toLowerCase() &&
          !colorParts.includes(item)
        );
      })
      .join('-');

    if (!base) return;

    const targetProduct = allProducts.find(
      p =>
        p.capacity === capacity &&
        p.color === selectedColor &&
        p.itemId.includes(base),
    );

    if (targetProduct) {
      navigate(`/${targetProduct.category}/${targetProduct.itemId}`);
    } else {
      setShowMessage(true);
    }
  };

  if (isLoading) {
    return (
      <div className="min-w-[320px] max-w-[1136px] mx-auto flex justify-center items-center h-64">
        <Loader />
      </div>
    );
  }

  if (category && errors.includes(category)) {
    return <ErrorMessage text={translations.somethingWentWrong} />;
  }

  return !currentProduct || showMessage ? (
    <ErrorMessage
      text={translations.productNotFound}
      back={true}
    />
  ) : (
    <div className="min-w-[320px] max-w-[1136px] mx-auto">
      <div className="mb-4 tablet:mb-6">
        <Breadcrumbs />
      </div>

      <div className="mb-6 tablet:mb-8">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-primary dark:text-dark-primary hover:text-secondary dark:hover:text-purple transition-colors"
        >
          <span className="text-base tablet:text-lg cursor-pointer">←</span>
          <span className="text-xs tablet:text-sm font-semibold cursor-pointer">
            {translations.back}
          </span>
        </button>
      </div>

      <h1 className="text-xl tablet:text-2xl desktop:text-[28px] font-bold text-primary dark:text-dark-primary mb-8 tablet:mb-10 desktop:mb-12">
        {currentProduct.name}
      </h1>

      <div className="flex flex-col tablet:flex-row gap-6 tablet:gap-8 desktop:gap-16 mb-12 tablet:mb-16 desktop:mb-20 min-w-0">
        <div className="flex-1 min-w-0 flex items-start justify-center">
          <ProductGallery images={imagesForGallery} />
        </div>
        <div className="flex-1 min-w-0 justify-between relative">
          <p className="text-xs tablet:text-sm text-secondary dark:text-dark-secondary font-semibold uppercase tracking-wider absolute top-0 right-0 ">
            ID: {currentProduct.id}
          </p>
          <div className="min-w-0 space-y-4 tablet:space-y-6 desktop:max-w-80">
            <p className="text-xs tablet:text-sm text-secondary dark:text-dark-secondary font-semibold tracking-wider mb-2">
              {translations.availableColors}
            </p>
            <ColorSelector
              colors={availableColors}
              selectedColor={selectedColor}
              onSelectColor={handleSelectColor}
            />
            <div className="h-px w-full bg-elements"></div>

            <div className="space-y-1">
              <p className="text-xs tablet:text-sm text-secondary dark:text-dark-secondary font-semibold tracking-wider">
                {translations.selectCapacity}
              </p>
            </div>
            <CapacitySelector
              availableCapacities={availableCapacities}
              selectedCapacity={selectedCapacity}
              onSelectCapacity={handleSelectCapacity}
            />
            <div className="h-px w-full bg-elements"></div>

            <div className="flex items-baseline gap-3 py-4">
              <span className="text-2xl tablet:text-3xl desktop:text-[32px] font-bold text-primary dark:text-dark-primary">
                ${currentProduct.price}
              </span>
              <span className="text-lg tablet:text-xl desktop:text-[22px] text-secondary dark:text-dark-secondary line-through">
                ${currentProduct.fullPrice}
              </span>
            </div>

            <div className="flex gap-2 tablet:gap-4">
              <ButtonMain product={currentProduct} />
              <FavoriteButton product={currentProduct} />
            </div>

            <div className="space-y-2 pt-6">
              <div className="flex flex-col gap-y-2 text-xs tablet:text-sm">
                <div className="flex justify-between">
                  <span className="text-secondary dark:text-dark-secondary">
                    {translations.screen}
                  </span>
                  <span className="text-primary dark:text-dark-primary font-medium">
                    {currentProduct.screen}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-secondary dark:text-dark-secondary">
                    {translations.resolution}
                  </span>
                  <span className="text-primary dark:text-dark-primary font-medium">
                    {currentProduct.details &&
                    'resolution' in currentProduct.details
                      ? currentProduct.details.resolution
                      : 'N/A'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-secondary dark:text-dark-secondary">
                    {translations.processor}
                  </span>
                  <span className="text-primary dark:text-dark-primary font-medium">
                    {currentProduct.details &&
                    'processor' in currentProduct.details
                      ? currentProduct.details.processor
                      : 'N/A'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-secondary dark:text-dark-secondary">
                    RAM
                  </span>
                  <span className="text-primary dark:text-dark-primary font-medium">
                    {currentProduct.ram}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col desktop:flex-row gap-8 desktop:gap-16 mb-16 desktop:mb-20">
        <div className="flex-1 min-w-0 w-full desktop:w-auto">
          <h2 className="text-xl tablet:text-2xl font-bold mb-6 text-primary dark:text-dark-primary">
            {translations.about}
          </h2>
          <div className="h-px w-full bg-elements mt-4 mb-8"></div>
          <div className="space-y-6 text-secondary dark:text-dark-secondary text-default">
            {currentProduct.details?.description &&
            currentProduct.details.description.length > 0 ? (
              currentProduct.details.description.map((section, index) => (
                <div key={index}>
                  <h3 className="font-semibold mb-3 text-primary dark:text-dark-primary">
                    {section.title}
                  </h3>
                  {section.text.map((paragraph, pIndex) => (
                    <p
                      key={pIndex}
                      className="leading-relaxed mb-3"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              ))
            ) : (
              <div>
                <h3 className="font-semibold mb-3 text-primary dark:text-dark-primary">
                  {translations.about} {currentProduct.name}
                </h3>
                <p className="leading-relaxed">{translations.aboutFallback}</p>
              </div>
            )}
          </div>
        </div>

        <div className="flex-1 min-w-0 w-full desktop:w-auto mt-8 desktop:mt-0">
          <h2 className="text-xl tablet:text-2xl font-bold mb-6 text-primary dark:text-dark-primary">
            {translations.techSpecs}
          </h2>
          <div className="h-px w-full bg-elements mb-7"></div>
          <div className="space-y-0">
            <div className="flex justify-between py-3">
              <span className="text-secondary dark:text-dark-secondary text-sm">
                {translations.screen}
              </span>
              <span className="text-primary dark:text-dark-primary text-sm font-medium">
                {currentProduct.screen}
              </span>
            </div>
            <div className="flex justify-between py-3">
              <span className="text-secondary dark:text-dark-secondary text-sm">
                {translations.resolution}
              </span>
              <span className="text-primary dark:text-dark-primary text-sm font-medium">
                {currentProduct.details?.resolution || 'N/A'}
              </span>
            </div>
            <div className="flex justify-between py-3">
              <span className="text-secondary dark:text-dark-secondary text-sm">
                {translations.processor}
              </span>
              <span className="text-primary dark:text-dark-primary text-sm font-medium">
                {currentProduct.details?.processor || 'N/A'}
              </span>
            </div>
            <div className="flex justify-between py-3">
              <span className="text-secondary dark:text-dark-secondary text-sm">
                RAM
              </span>
              <span className="text-primary dark:text-dark-primary text-sm font-medium">
                {currentProduct.ram}
              </span>
            </div>
            <div className="flex justify-between py-3">
              <span className="text-secondary dark:text-dark-secondary text-sm">
                {translations.builtInMemory}
              </span>
              <span className="text-primary dark:text-dark-primary text-sm font-medium">
                {currentProduct.capacity}
              </span>
            </div>
            <div className="flex justify-between py-3">
              <span className="text-secondary dark:text-dark-secondary text-sm">
                {translations.camera}
              </span>
              <span className="text-primary dark:text-dark-primary text-sm font-medium">
                {currentProduct.details && 'camera' in currentProduct.details
                  ? currentProduct.details.camera
                  : 'N/A'}
              </span>
            </div>
            <div className="flex justify-between py-3">
              <span className="text-secondary dark:text-dark-secondary text-sm">
                {translations.zoom}
              </span>
              <span className="text-primary dark:text-dark-primary text-sm font-medium">
                {currentProduct.details && 'zoom' in currentProduct.details
                  ? currentProduct.details.zoom
                  : 'N/A'}
              </span>
            </div>
            <div className="flex justify-between py-3">
              <span className="text-secondary dark:text-dark-secondary text-sm">
                {translations.cell}
              </span>
              <span className="text-primary dark:text-dark-primary text-sm font-medium">
                {currentProduct.details && 'cell' in currentProduct.details
                  ? currentProduct.details.cell.join(', ')
                  : 'N/A'}
              </span>
            </div>
          </div>
        </div>
      </div>

      <ProductSlider
        sliderConfig={sliderConfig}
        products={recommendedProducts}
      />
    </div>
  );
};
