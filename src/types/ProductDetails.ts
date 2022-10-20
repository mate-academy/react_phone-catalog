export type ProductDetails = {
  android: {
    os: string;
  },
  battery: {
    standbyTime: string,
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
  connectivity: {
    bluetooth: string,
  },
  images: string[];
  name: string;
  storage: {
    ram: string,
  };
};
