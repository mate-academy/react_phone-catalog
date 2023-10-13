export interface ProductDetailsType {
  android: {
    os: string;
  },
  battery: {
    standbyTime: string,
  },
  camera: {
    primary: string,
  },
  connectivity: {
    bluetooth: string,
    cell: string,
  },
  description: string;
  display: {
    screenResolution: string,
    screenSize: string,
    touchScreen: string,
  },
  hardware: {
    cpu: string,
  };
  id: string;
  images: string[];
  name: string;
  storage: {
    ram: string,
    flash: string,
  };
}
