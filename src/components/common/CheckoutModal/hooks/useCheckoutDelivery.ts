import { useEffect, useState } from 'react';

import { notify } from '@/utils/notifications';
import {
  getCities,
  getWarehouses,
  type City,
  type Warehouse,
} from '@/utils/novaPostaClient';

import type { DeliveryMethod } from '../CheckoutModal.types';

interface UseCheckoutDeliveryParams {
  isOpen: boolean;
}

export function useCheckoutDelivery({ isOpen }: UseCheckoutDeliveryParams) {
  const [deliveryOpen, setDeliveryOpen] = useState(false);
  const [deliveryMethod, setDeliveryMethod] =
    useState<DeliveryMethod>('novapost');
  const [address, setAddress] = useState('');
  const [cities, setCities] = useState<City[]>([]);
  const [selectedCity, setSelectedCity] = useState<City | null>(null);
  const [cityQuery, setCityQuery] = useState('');
  const [citiesOpen, setCitiesOpen] = useState(false);
  const [warehouses, setWarehouses] = useState<Warehouse[]>([]);
  const [selectedWarehouse, setSelectedWarehouse] = useState<Warehouse | null>(
    null,
  );
  const [warehousesOpen, setWarehousesOpen] = useState(false);
  const [loadingCities, setLoadingCities] = useState(false);
  const [loadingWarehouses, setLoadingWarehouses] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    setDeliveryMethod('novapost');
    setAddress('');
    setCityQuery('');
    setSelectedCity(null);
    setSelectedWarehouse(null);
    setDeliveryOpen(false);
    setCitiesOpen(false);
    setWarehousesOpen(false);
  }, [isOpen]);

  useEffect(() => {
    const loadCities = async () => {
      setLoadingCities(true);
      try {
        const citiesData = await getCities();
        setCities(citiesData);
        if (citiesData.length === 0) {
          console.warn('No cities loaded from Nova Poshta');
        }
      } catch (error) {
        console.error('Failed to load cities:', error);
        notify.error('Failed to load cities from Nova Poshta');
      } finally {
        setLoadingCities(false);
      }
    };

    if (isOpen && deliveryMethod === 'novapost') {
      loadCities();
    }
  }, [isOpen, deliveryMethod]);

  useEffect(() => {
    const loadWarehouses = async () => {
      if (!selectedCity) {
        setWarehouses([]);
        setSelectedWarehouse(null);
        return;
      }

      setLoadingWarehouses(true);
      try {
        const warehousesData = await getWarehouses({
          cityRef: selectedCity.Ref,
        });
        setWarehouses(warehousesData);
        setSelectedWarehouse(null);
      } catch (error) {
        console.error('Failed to load warehouses:', error);
        notify.error('Failed to load warehouses');
      } finally {
        setLoadingWarehouses(false);
      }
    };

    loadWarehouses();
  }, [selectedCity]);

  const filteredCities = (
    cityQuery.trim() ?
      cities.filter((city) =>
        city.Description.toLowerCase().includes(cityQuery.toLowerCase().trim()),
      )
    : cities).slice(0, 20);

  const normalizeWarehouseText = (text: string) =>
    text.replace(/Пункт приймання[-–]видачі/gi, 'Пункт видачі');

  const handleSelectHomeDelivery = () => {
    setDeliveryMethod('home');
    setDeliveryOpen(false);
    setSelectedCity(null);
    setSelectedWarehouse(null);
    setCitiesOpen(false);
    setWarehousesOpen(false);
  };

  const handleSelectNovaPoshtaDelivery = () => {
    setDeliveryMethod('novapost');
    setDeliveryOpen(false);
    setAddress('');
    setCitiesOpen(false);
    setWarehousesOpen(false);
  };

  const handleCityQueryChange = (value: string) => {
    setCityQuery(value);
    setSelectedCity(null);
    setSelectedWarehouse(null);
    setCitiesOpen(true);
  };

  const handleSelectCity = (city: City) => {
    setSelectedCity(city);
    setCityQuery(city.Description);
    setCitiesOpen(false);
  };

  return {
    deliveryOpen,
    setDeliveryOpen,
    deliveryMethod,
    setDeliveryMethod,
    address,
    setAddress,
    cityQuery,
    setCityQuery,
    citiesOpen,
    setCitiesOpen,
    filteredCities,
    selectedCity,
    loadingCities,
    warehouses,
    warehousesOpen,
    setWarehousesOpen,
    selectedWarehouse,
    setSelectedWarehouse,
    loadingWarehouses,
    normalizeWarehouseText,
    handleSelectHomeDelivery,
    handleSelectNovaPoshtaDelivery,
    handleCityQueryChange,
    handleSelectCity,
  };
}
