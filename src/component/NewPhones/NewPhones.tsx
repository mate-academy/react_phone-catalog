import { ProductsSlider } from '../ProductsSlider';

export const NewPhones = () => {
  return (
    <section className="new-phones">
      <div className="container">
        <ProductsSlider
          title="Brand new models"
          filterByYears={2019}
          sale={false}
        />
      </div>
    </section>
  );
};
