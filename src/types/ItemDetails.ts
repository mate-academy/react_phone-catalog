export interface ItemDetails {
  additionalFeatures: string,
  android: {
    os: string,
    ui: string,
  },
  availability: string[],
  battery: {
    standbyTime: string,
    talkTime: string,
    type: string,
  },
  camera: {
    features: string[],
    primary: string,
  },
  connectivity: {
    // "bluetooth": "Bluetooth 2.1",
    cell: string,
    // "gps": true,
    // "infrared": false,
    // "wifi": "802.11 b/g"
  },
  description: string,
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
  id: string,
  images: string[],
  name: string,
  sizeAndWeight: {
    dimensions: [string, string, string]
    weight: string,
  },
  storage: {
    flash: string,
    ram: string,
  }
}
