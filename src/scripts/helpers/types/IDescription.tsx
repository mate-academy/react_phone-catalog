export type IDescrition = {
  additionalFeatures: string,
  android: {
    os: string,
    ui: string
  },
  availability: [ string ],
  battery: {
    standbyTime: string,
    talkTime: string,
    type: string
  },
  camera: {
    features: [
      string,
    ],
    primary: string
  },
  connectivity: {
    bluetooth: string,
    cell: string,
    gps: true,
    infrared: false,
    wifi: string
  },
  description: string,
  display: {
    screenResolution: string,
    screenSize: string,
    touchScreen: true
  },
  hardware: {
    accelerometer: true,
    audioJack: string,
    cpu: string,
    fmRadio: false,
    physicalKeyboard: false,
    usb: string
  },
  id: string,
  images: [ string ],
  name: string,
  sizeAndWeight: {
    dimensions: [string],
    weight: string
  },
  storage: {
    flash: string,
    ram: string
  }
};
