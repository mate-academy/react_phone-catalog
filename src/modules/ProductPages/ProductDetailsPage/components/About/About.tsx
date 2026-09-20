import { ProductType } from '../../../../../shared/types/ProductType';

type AboutType = {
  products: ProductType;
};
export const About = ({ products }: AboutType) => {
  return (
    <section className="details-about">
      <h3 className="details-section-title">About</h3>
      {products.description.map((item, index) => (
        <div key={index} className="details-about-description">
          <h4>{item.title}</h4>
          <p>{item.text}</p>
        </div>
      ))}
    </section>
  );
};
