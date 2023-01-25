export interface DetailsOfProduct {
  id: string;
  name: string;
  android: { os: string };
  battery: { type: string };
  camera: { primary: string, features: string[] };
  connectivity: {
    bluetooth: string,
    cell: string,
    gps: boolean,
    wifi: string,
  };
  storage: { flash: string, ram: string };
  display: { screenSize : string, screenResolution: string };
  description: string;
  hardware: {
    cpu: string,
    audioJack: string,
    fmRadio: boolean,
    usb: string,
  };
  images: string[];
}
