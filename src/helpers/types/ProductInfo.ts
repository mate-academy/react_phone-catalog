export type ProductInfo = {
  images: string[]
  description: string
  display: {
    screenResolution: string
  }
  hardware: {
    cpu: string
  }
  storage: {
    flash: string
  }
  camera: {
    primary: string
  }
  connectivity: {
    cell: string
  }
};
