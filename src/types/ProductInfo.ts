export interface ProductInfo {
  id: string;
  images: string[];
  name: string;
  display: {
    screenResolution: string;
    screenSize: string;
  }
  hardware: {
    cpu: string;
  }
  storage: {
    ram: string;
    flash: string;
  }
  description: string;
  camera: {
    primary: string;
  }
  connectivity: {
    bluetooth: string;
    cell: string;
  }
  battery: {
    type: string;
  }
  sizeAndWeight: {
    weight: string
  }
}
