import { DeviceFull } from './DeviceFull';

export type Accessorie = Omit<DeviceFull, 'camera' | 'zoom'>;
