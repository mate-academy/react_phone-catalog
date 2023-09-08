export interface ProductFeatures {
  images: string[];
  name: string;
  storage: Record<string, string>;
  id: string;
  description: string;
  display: Record<string, string>;
  battery: Record<string, string>;
  hardware: Record<string, string>;
  connectivity: Record<string, string>;
  camera: Record<string, string | string[]>;
}
