import { BaseDetails } from './BaseDetails';

export type AccessoryDetails = BaseDetails & {
  camera?: string;
  zoom?: string;
};
