import { Phone } from '../../../../types/Phone';
import './AboutUs.scss';

type Props = {
  phone: Phone | null;
};

export const AboutUs: React.FC<Props> = ({ phone }) => {
  if (phone === null) {
    return null;
  }

  const splitCell = phone.cell.slice(0, 4).join(', ');

  const characteristics = [
    ['Screen', phone.screen],
    ['Resolution', phone.resolution],
    ['Processor', phone.processor],
    ['RAM', phone.ram],
    ['Built in memory', phone.capacity],
    ['Camera', phone.camera],
    ['Zoom', phone.zoom],
    ['Cell', splitCell],
  ];

  return (
    <section className="AboutUs">
      <div className="AboutUs-content">
        <h2 className="AboutUs-h2">About</h2>

        {phone.description.map(item => {
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
