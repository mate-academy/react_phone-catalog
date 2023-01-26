export interface ProductDetails {
  id: string,
  name: string,
  description: string,
  images: string[],
  camera: {
    primary: string,
  }
  dimensions: {
    dimensions: string[],
    weight: string,
  },
  storage: {
    flash: string,
    ram: string,
  }
  display: {
    screenResolution: string,
    screenSize: string,
    touchScreen: boolean,
  }
  hardware: {
    cpu: string,
  },
  connectivity: {
    bluetooth: string,
    cell: string,
    gps: true,
    infrared: false,
    wifi: string,
  },
  android: {
    os: string,
    ui: string,
  },
}
