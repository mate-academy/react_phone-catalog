import { useDiviceSize } from '../../../../utils/useDeviceSize/useDiviceSize';
import { Desktop } from './Desktop';
import { Tab } from './Tab';
import { Phone } from './Phone';

export const DetailsLoader = () => {
  const { device } = useDiviceSize();
  let loader = <Desktop />;

  if (device !== 'desktop') {
    loader = device === 'tab' ? <Tab /> : <Phone />;
  }

  return (
    loader
  );
};
