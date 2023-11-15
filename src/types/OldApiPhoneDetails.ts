export type OldApiPhoneDetails = {
  id: string,
  additionalFeatures: string,
  android: {
    os: string,
    ui: string,
  },
  camera: {
    features: string[],
    primary: string,
  }
  availability: string[],
  battery: {
    standbyTime: string,
    talkTime: string,
    type: string,
  },
  images: string[],
  connectivity: {
    bluetooth: string,
    cell: string,
    gps: string,
    infrared: boolean,
    wifi: string,
    [key: string]: string | boolean,
  },
  display: {
    screenResolution: string,
    screenSize: string,
    touchScreen: boolean,
  },
  hardware: {
    accelerometer: boolean,
    audioJack: string,
    cpu: string,
    fmRadio: boolean,
    physicalKeyboard: boolean,
    usb: string,
  },
  sizeAndWeight: {
    dimensions: string[],
    weight: string,
  },
  storage: {
    flash: string,
    ram: string,
  },
  description: string,
};
