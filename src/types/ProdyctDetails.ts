import { Android } from './Android';
import { Battery } from './Battery';
import { Camera } from './Camera';
import { Connectivity } from './Connectivity';
import { Display } from './Display';
import { Hardware } from './Hardware';
import { SizeAndWeight } from './SizeAndWeight';
import { Storage } from './Storage';

export interface ProductDetails {
  additionalFeatures: string;
  android: Android;
  availability: string[];
  battery: Battery;
  camera: Camera;
  connectivity: Connectivity;
  description: string;
  display: Display;
  hardware: Hardware;
  id: string;
  images: string[];
  name: string;
  sizeAndWeight: SizeAndWeight;
  storage: Storage;
}
