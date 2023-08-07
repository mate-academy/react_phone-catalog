import { OldApiPhoneDetails } from '../types/OldApiPhoneDetails';
import { PhoneDetails } from '../types/PhoneDetails';
import { Product } from '../types/Product';

export const phoneDetailsSameType = (
  phoneDetails: OldApiPhoneDetails,
  selectedPhone: Product,
): PhoneDetails => {
  let features = '';
  let connectivity = '';

  Object.keys(phoneDetails.connectivity).forEach((key) => {
    if (key === 'gps' && phoneDetails.connectivity.gps === 'true') {
      connectivity += 'gps';
    } else if (typeof phoneDetails.connectivity[key] === 'boolean') {
      if (phoneDetails.connectivity[key] === 'true') {
        connectivity += key;
      }
    } else {
      connectivity += phoneDetails.connectivity[key];
    }
  });

  phoneDetails.camera.features.forEach((item, index) => {
    features += item;
    if (index !== phoneDetails.camera.features.length - 1) {
      features += ', ';
    }
  });

  const priceWithDiscount = selectedPhone.discount
    ? selectedPhone.price - selectedPhone.discount
    : selectedPhone.price;

  const capacityGB = `${Math.floor(+phoneDetails.storage.flash.slice(0, -2) / 1000)}GB`;

  return {
    id: phoneDetails.id,
    namespaceId: selectedPhone.id,
    name: selectedPhone.name,
    capacity: capacityGB,
    capacityAvailable: [capacityGB],
    priceRegular: selectedPhone.price,
    priceDiscount: priceWithDiscount,
    colorsAvailable: [''],
    color: '',
    images: phoneDetails.images,
    description: [
      { title: 'Introducing', text: [phoneDetails.description] },
      { title: 'More about', text: [phoneDetails.description] },
      { title: 'Finally', text: [phoneDetails.description] },
    ],
    screen: ` ${phoneDetails.display.screenSize} ${phoneDetails.display.touchScreen ? 'screen touch' : ''}`,
    resolution: phoneDetails.display.screenResolution,
    processor: `${phoneDetails.android.ui} ${phoneDetails.android.os} ${phoneDetails.hardware.cpu}`,
    ram: phoneDetails.storage.ram,
    camera: phoneDetails.camera.primary,
    zoom: 'no',
    cell: [phoneDetails.battery.type, features, connectivity],
  };
};
