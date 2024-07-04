import { ProductSlider } from '../ProductSlider';
import { Slider } from '../Slider';
import phonesFromServer from '../../api/phones.json';
import { ProductLinks } from '../ProductLinks';

export const HomePage = () => {
  const newPhones = phonesFromServer.filter(
    phone => phone.name.includes('14') && phone.capacity === '128GB',
  );

  const hotPrices = phonesFromServer
    .filter(
      phone =>
        phone.priceRegular - phone.priceDiscount >=
          (phone.priceRegular / 100) * 5 &&
        phone.priceDiscount < 1400 &&
        phone.priceDiscount > 800 &&
        phone.capacity === '128GB',
    )
    .reverse();

  return (
    <main className="home-page flex">
      <h1 className="home-page__title">Welcome to Nice Gadgets store!</h1>
      <Slider parentClassName="home-page" />
      <ProductSlider
        title="Brand new models"
        products={newPhones}
        parentClassName="home-page"
      />
      <ProductLinks parentClassName="home-page" />
      <ProductSlider
        title="Hot prices"
        products={hotPrices}
        parentClassName="home-page"
      />
    </main>
  );
};
