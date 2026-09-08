import { useDevices } from '../../api';
import { Device, ProductType } from '../types';

// Really important tools
export function getDevicesFromCategory(
  devicesFromAPI: Device[],
  category: ProductType,
) {
  // Simplify function to remove the number by default
  return [...devicesFromAPI].filter(device => device.category === category)
    .length;
}

export function getNewDevices(devicesFromAPI: Device[]): Device[] {
  return [...devicesFromAPI].filter(device => device.year === 2022);
}

export function useSomeCrazyMove(detailsId: string) {
  const all = useDevices();

  return all.devices.find(device => device.itemId === detailsId);
}

export function getHotPrices(devicesFromAPI: Device[]): Device[] {
  const filteredDevices = [...devicesFromAPI].filter(device => {
    if (device.price === device.fullPrice) {
      return false;
    }

    return true;
  });

  const hotPrices = filteredDevices.sort((deviceA, deviceB) => {
    const absValA = deviceA.fullPrice - deviceA.price;
    const absValB = deviceB.fullPrice - deviceB.price;

    return absValB - absValA;
  });

  return hotPrices;
}

export function getSuggestedProducts(
  currentDeviceId: string,
  devicesFromAPI: Device[],
  deviceCategory: string,
  devicePrice: number,
): Device[] {
  return [...devicesFromAPI]
    .filter(
      device =>
        device.category === deviceCategory &&
        device.price <= devicePrice &&
        device.itemId !== currentDeviceId,
    )
    .sort((a, b) => a.price - b.price);
}

// Niche tools
export const capitalizeWords = (str: string) =>
  str.replace(/\b\w/g, char => char.toUpperCase());
