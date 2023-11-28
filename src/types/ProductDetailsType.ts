export interface DescriptionItem {
  title: string,
  text: string[],
}

export interface ProductDetailsType {
  // additionalFeatures: string,
  // android: {
  //   os: string,
  //   ui: string,
  // },
  // availability: string[],
  // battery: {
  //   standbyTime: string,
  //   talkTime: string,
  //   type: string
  // },
  // camera: {
  //   features: string[],
  //   primary?: string
  // },
  // connectivity: {
  //   bluetooth: string,
  //   cell: string,
  //   gps: boolean,
  //   infrared: boolean,
  //   wifi: string
  // },
  // description: string,
  // display: {
  //   screenResolution: string,
  //   screenSize: string,
  //   touchScreen: boolean
  // },
  // hardware: {
  //   accelerometer: boolean,
  //   audioJack: string,
  //   cpu: string,
  //   fmRadio: boolean,
  //   physicalKeyboard: boolean,
  //   usb: boolean
  // },
  // id: string,
  // images: string[],
  // name: string,
  // sizeAndWeight: {
  //   dimensions: string[],
  //   weight: string
  // },
  // storage: {
  //   flash: string,
  //   ram: string
  // }

  id: string,
  namespaceId: string,
  name: string,
  capacityAvailable: string[],
  capacity: string,
  priceRegular: number,
  priceDiscount: number,
  colorsAvailable: string[],
  color: string,
  images: string[],
  description: DescriptionItem[],
  screen: string,
  resolution: string,
  processor: string,
  ram: string,
  camera: string,
  zoom: string,
  cell: string[],
}
