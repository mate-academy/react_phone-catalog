/* eslint-disable no-console */
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styles from './ProductDetails.module.scss';
import productNotFound from '../../../public/img/product-not-found.png';
import { useAppDispatch, useAppSelector } from '../../hooks/helperToolkit';
import { GoBackButton } from '../../components/GoBackButton';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { fetchDeviceById, fetchDevicesList } from '../../slices/deviceSlice';
import { VariantDetails } from '../../components/VariantDetails';
import { DescriptionDetails } from '../../components/DescriptionDetails';
import { ProductsRow } from '../../components/ProductsRow';
import { EmptyState } from '../../components/EmptyState';
import { setGlobalLoading } from '../../slices/uiSlice';

export const ProductDetails: React.FC = () => {
  const { id, category } = useParams<{ id: string; category: string }>();
  const dispatch = useAppDispatch();
  const { selectedDevice, deviceList, fetchDeviceLoading, fetchDeviceError } =
    useAppSelector(state => state.device);
  const navigate = useNavigate();

  const [selectedColor, setSelectedColor] = useState<string>('');
  const [selectedCapacity, setSelectedCapacity] = useState<string>('');
  const [mainImage, setMainImage] = useState<string>('');
  const [loader, setLoader] = useState<boolean>(true);

  const currentDevice = deviceList.find(
    device => device.itemId === selectedDevice?.id,
  );

  useEffect(() => {
    if (selectedDevice) {
      setSelectedColor(selectedDevice.color || '');
      setSelectedCapacity(selectedDevice.capacity || '');
      setMainImage(selectedDevice.images[0] || '');
    }
  }, [selectedDevice]);

  useEffect(() => {
    if (category) {
      dispatch(fetchDevicesList(category)).catch(error => {
        console.error('Error fetching devices list:', error);
      });
      setLoader(false);
    }
  }, [category, dispatch]);

  useEffect(() => {
    if (id && category) {
      dispatch(fetchDeviceById({ id, category })).catch(error => {
        console.error('Error fetching device by ID:', error);
      });
      setLoader(false);
    }
  }, [id, category, dispatch]);

  useEffect(() => {
    if (!fetchDeviceLoading && !loader) {
      dispatch(setGlobalLoading(false));
      setLoader(true);
    }
  }, [fetchDeviceLoading]);

  const handleProductChange = (newColor: string, newCapacity: string) => {
    if (newColor && newCapacity && selectedDevice?.namespaceId) {
      const newId = `${selectedDevice.namespaceId}-${newCapacity.toLowerCase()}-${newColor.split(' ').join('-')}`;

      navigate(`/${category}/${newId}`);
    }
  };

  const handleColorChange = (newColor: string) => {
    if (newColor !== selectedColor) {
      setSelectedColor(newColor);
      handleProductChange(newColor, selectedCapacity);
    }
  };

  const handleCapacityChange = (newCapacity: string) => {
    if (newCapacity !== selectedCapacity) {
      setSelectedCapacity(newCapacity);
      handleProductChange(selectedColor, newCapacity);
    }
  };

  const handleImageClick = (image: string) => {
    setMainImage(image);
  };

  const isDeviceNotFound =
    !loader && (fetchDeviceError || !selectedDevice || !currentDevice);

  if (isDeviceNotFound) {
    return (
      <div className={styles.containerNotFound}>
        <EmptyState
          image={productNotFound}
          title="Product was not found"
          // eslint-disable-next-line max-len
          description="Looks like this gadget wandered off into the digital void."
        />
      </div>
    );
  }

  return (
    <>
      <Breadcrumbs name={selectedDevice?.name} />

      <GoBackButton linkTo={`/${category}`} />

      <div className={styles.block}>
        <h2 className={styles.title}>{selectedDevice?.name}</h2>

        {selectedDevice && (
          <VariantDetails
            currentDevice={currentDevice}
            deviceById={selectedDevice}
            mainImage={mainImage}
            selectedCapacity={selectedCapacity}
            selectedColor={selectedColor}
            handleColorChange={handleColorChange}
            handleCapacityChange={handleCapacityChange}
            handleImageClick={handleImageClick}
          />
        )}

        <DescriptionDetails />

        <ProductsRow
          products={deviceList.map(device => ({
            id: device.id,
            category: device.category,
            itemId: device.itemId,
            name: device.name,
            fullPrice: device.fullPrice,
            price: device.priceDiscount,
            screen: device.screen,
            capacity: device.capacity,
            color: device.color,
            ram: device.ram,
            year: device.year,
            image: device.images[0],
          }))}
          hasDiscount={true}
          title="You may also like"
        />
      </div>
    </>
  );
};
