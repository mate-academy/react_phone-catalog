export interface ProductSpecs {
  description: string;
  name: string;
  images: string[];
  id:string;
  storage: { flash: string, ram: string };
  display: { screenResolution: string, screenSize: string };
  hardware: { cpu: string };
  camera: { primary: string };
}
