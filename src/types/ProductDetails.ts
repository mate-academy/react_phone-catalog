// export interface ProductDetails {
//   additionalFeatures: string,
//   android: {
//     os: string,
//     ui: string,
//   },
//   availability: string[],
//   battery: {
//     standbyTime: string,
//     talkTime: string,
//     type: string,
//   },
//   camera: {
//     features: string[],
//     primary: string,
//   },
//   connectivity: {
//     bluetooth: string,
//     cell: string,
//     gps: boolean,
//     infrared: boolean,
//     wifi: string,
//   },
//   description: string,
//   display: {
//     screenResolution: string,
//     screenSize: string,
//     touchScreen: boolean,
//   },
//   hardware: {
//     accelerometer: boolean,
//     audioJack: string,
//     cpu: string,
//     fmRadio: boolean,
//     physicalKeyboard: boolean,
//     usb: string,
//   },
//   id: string,
//   images: string[],
//   name: string,
//   sizeAndWeight: {
//     dimensions: string[],
//     weight: string,
//   },
//   storage: {
//     flash: string,
//     ram: string,
//   }
// }

export interface ProductDetails {
  id: string;
  namespaceId: string;
  name: string;
  capacityAvailable: string[];
  capacity: string;
  priceRegular: number;
  priceDiscount: number;
  colorsAvailable: string[];
  color: string;
  images: string[];
  description: {
    title: string;
    text: string[];
  }[];
  screen: string;
  resolution: string;
  processor: string;
  ram: string;
  camera: string;
  zoom: string;
  cell: string[];
}
