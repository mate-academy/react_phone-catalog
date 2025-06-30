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
      <div className="AboutUs-width">
        <div className="AboutUs-about">
          <h2 className="AboutUs-about__h2">About</h2>

          {product.description.map(item => {
            return (
              <div key={item.title} className="AboutUs-about__container">
                <h3 className="AboutUs-about__container-title">{item.title}</h3>

                <p className="AboutUs-about__container-p">{item.text}</p>
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
      </div>
    </section>
  );
};
