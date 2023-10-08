export interface ProductDetails {
  additionalFeatures: string;
  androind: {
    os: string;
    ui: string;
  };
  availability: string[];
  battery: {
    standByTime: string;
    talkTime: string;
    type: string;
  };
  camera: {
    features: string[];
    primary: string;
  };
  connectivity: {
    bluetooth: string;
    cell: string;
    gps: boolean;
    infrared: boolean;
    wifi: string;
  };
  description: string;
  display: {
    screenResolution: string;
    screenSize: string;
    touchScreen: boolean;
  };
  hardware: {
    accelerometer: boolean;
    audioJack: string;
    cpu: string;
    fmRadio: boolean;
    physicalKeyboard: boolean;
    usb: string;
  };
  id: string;
  images: string[];
  name: string;
  sizeAndWeight: {
    dimensions: string[];
    weight: string;
  };
  storage: {
    flash: string;
    ram: string;
  };
}
