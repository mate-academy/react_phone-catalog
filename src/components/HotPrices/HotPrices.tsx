import { ProductCard } from '../ProductCard';
import { SectionHeader } from '../SectionHeader/SectionHeader';
import './HotPrices.scss';

// const phones = [
//   {},
// ];

export const HotPrices = () => {
  return (
    <div className="main__hot-prices hot-prices">
      <SectionHeader title="Hot prices" hasButtons />
      <div className="hot-prices__cards">
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        {/* {phones.map(el => (
        ))} */}
      </div>
    </div>
  );
};
