/* eslint-disable max-len */
import { useParams, useNavigate } from 'react-router-dom';
import { useDevice, useDevices, useDevicesFamily } from '../../api';
import { PositionOnPage } from '../shared/PositionOnPage/PositionOnPage';
import { ImagePreview } from './ImagePreview';
import { ProductInteraction } from './ProductInteraction';
import { ProductDetailsSkeleton } from './ProductDetailsSkeleton/ProductDetailsSkeleton';

import styles from './ProductDetaulsPage.module.scss';
import { AboutPages } from './AboutPages';
import { DeviceSpecs } from './DeviceSpecs';
import { ProductSlider } from '../HomePage/ProductSlider/ProductSlider';
import { getSuggestedProducts } from '../hooks/utilHooks';
import { BackButton } from '../shared/BackButton';
import { useLanguage } from '../../contexts/LanguageContext';
import { ProductNotFoundPage } from '../shared/ProductNotFoundPage';

const validCategories = ['phones', 'tablets', 'accessories'];

export const ProductDetailsPage = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { t } = useLanguage();

  const { devices } = useDevices();
  const { device, loading: deviceLoading } = useDevice(productId);
  const { devices: deviceFamily } = useDevicesFamily(
    device?.namespaceId ?? '',
    device?.category ?? '',
  );

  if (deviceLoading) {
    return (
      <div className={styles.detailsPage__Container}>
        <PositionOnPage />
        <BackButton />
        <ProductDetailsSkeleton />
      </div>
    );
  }

  if (
    !device ||
    !device.category ||
    !validCategories.includes(device.category)
  ) {
    return <ProductNotFoundPage />;
  }

  const handleVariantChange = (nextColor: string, nextCapacity: string) => {
    if (!deviceFamily) {
      return;
    }

    const matchedVariant = deviceFamily.find(
      d => d.color === nextColor && d.capacity === nextCapacity,
    );

    if (matchedVariant && matchedVariant.id !== device.id) {
      navigate(`/${matchedVariant.category}/${matchedVariant.id}`);
    }
  };

  const onColorChange = (color: string) =>
    handleVariantChange(color, device.capacity);
  const onCapacityChange = (capacity: string) =>
    handleVariantChange(device.color, capacity);

  const suggestedDevices = getSuggestedProducts(
    device.id,
    devices,
    device.category,
    device?.priceDiscount,
  );

  return (
    <div className={styles.detailsPage__Container}>
      <PositionOnPage />
      <BackButton />

      <h1 className={styles.detailsPage__Title}>{device.name}</h1>

      <div className={styles.detailsPage__Header}>
        <ImagePreview images={device.images} />

        <ProductInteraction
          deviceDetails={device}
          onColorChange={onColorChange}
          onCapacityChange={onCapacityChange}
        />
      </div>

      <div className={styles.detailsPage__Body}>
        <AboutPages description={device.description} />

        <DeviceSpecs
          specs={{
            Screen: device.screen,
            Resolution: device.resolution,
            Processor: device.processor,
            Ram: device.ram,
            Capacity: device.capacity,
            Camera: device.camera,
            Zoom: device.zoom,
            Cell: device.cell,
          }}
        />
      </div>

      <div className={styles.detailsPage__Footer}>
        <ProductSlider
          title={t('home.youMayLike')}
          devicesForDisplay={suggestedDevices}
          type="full"
        />
      </div>
    </div>
  );
};
