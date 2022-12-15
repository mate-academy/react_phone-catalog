export interface Details {
  id: string,
  name: string,
  images: string[];
  description: string;
  display: {
    screenResolution: string
    screenSize: string;
  };
  sizeAndWeight: {
    weight: string;
  };
  storage: {
    ram: string;
  };
  camera: {
    primary: string;
  };
  connectivity : {
    bluetooth: string;
    cell: string;
    wifi: string;
  };
  hardware: {
    usb: string;
  }
}
