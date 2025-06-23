import { Product } from '../../../../types/Product';
import './AboutUs.scss';

type Props = {
  product: Product | null;
};

export const AboutUs: React.FC<Props> = ({ product }) => {
  if (product === null) {
    return null;
  }

  const splitCell = product.cell.slice(0, 4).join(', ');

  const characteristics = [
    ['Screen', product.screen],
    ['Resolution', product.resolution],
    ['Processor', product.processor],
    ['RAM', product.ram],
    ['Built in memory', product.capacity],
    ['Camera', product.camera],
    ['Zoom', product.zoom],
    ['Cell', splitCell],
  ];

  return (
    <section className="AboutUs">
      <div className="AboutUs-content">
        <h2 className="AboutUs-h2">About</h2>

        {product.description.map(item => {
          return (
            <div key={item.title} className="AboutUs-container">
              <h3 className="AboutUs-content__title">{item.title}</h3>

              <p className="AboutUs-content__p">{item.text}</p>
            </div>
          );
        })}
      </div>

      <div className="tech-specs">
        <h2 className="tech-specs__h2">Tech specs</h2>

        <ul className="tech-specs__list">
          {characteristics.map(item => {
            return (
              <li key={item[0]} className="tech-specs__list-item">
                <div>{item[0]}</div>
                <div>{item[1]}</div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};
