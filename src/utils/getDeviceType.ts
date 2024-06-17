/* eslint-disable @typescript-eslint/no-explicit-any */
import { DeviceTypes } from '../types/DeviceTypes';

export function getDeviceType(
  mobileProp: any = DeviceTypes.Mobile,
  tabletProp: any = DeviceTypes.Tablet,
  desktopProp: any = DeviceTypes.Desktop,
) {
  if (window.innerWidth < 640) {
    return mobileProp;
  } else if (window.innerWidth < 1200) {
    return tabletProp;
  } else {
    return desktopProp;
  }
}
