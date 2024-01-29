import { PhoneCard } from '../PhoneCard';
import './HotPrices.scss';
import { SectionHeader } from '../SectionHeader/SectionHeader';

// const phones = [
//   {},
// ];

export const HotPrices = () => {
  return (
    <div className="main__hot-prices hot-prices">
      <SectionHeader title="Hot prices" hasButtons />
      <div className="hot-prices__cards">
        <PhoneCard info="" />
        <PhoneCard info="" />
        <PhoneCard info="" />
        <PhoneCard info="" />
        {/* {phones.map(el => (
        ))} */}
      </div>
    </div>
  );
};
