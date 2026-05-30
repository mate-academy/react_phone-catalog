import { Phone } from '../../types/phones';

type Props = {
  item: Phone;
};

export const ItemDescription: React.FC<Props> = ({ item }) => {
  const descriptions = item.description;

  return (
    <div className="item__section description">
      <div className="description__container">
        <h3 className="description__h3">About</h3>
        <ul className="description__about">
          <div className="underline" />
          {descriptions.map((description, index) => (
            <li key={index} className="description__about-item">
              <h4 className="description__about-title">{description.title}</h4>
              <p className="description__about-text">{description.text}</p>
            </li>
          ))}
        </ul>
      </div>
      <div className="description__container">
        <h3 className="description__h3">Tech specs</h3>
        <div className="description__tech-specs">
          <div className="underline" />
          <ul className="description__tech-specs-list">
            <li className="description__tech-specs-item">
              <p className="tdescription__tech-specs-title">Screen</p>
              <p className="description__tech-specs-value">{item.screen}</p>
            </li>
            <li className="description__tech-specs-item">
              <p className="tdescription__tech-specs-title">Resolution</p>
              <p className="description__tech-specs-value">{item.resolution}</p>
            </li>
            <li className="description__tech-specs-item">
              <p className="tdescription__tech-specs-title">Processor</p>
              <p className="description__tech-specs-value">{item.processor}</p>
            </li>
            <li className="description__tech-specs-item">
              <p className="tdescription__tech-specs-title">RAM</p>
              <p className="description__tech-specs-value">{item.ram}</p>
            </li>
            <li className="description__tech-specs-item">
              <p className="tdescription__tech-specs-title">Built in memory</p>
              <p className="description__tech-specs-value">{item.capacity}</p>
            </li>
            <li className="description__tech-specs-item">
              <p className="tdescription__tech-specs-title">Camera</p>
              <p className="description__tech-specs-value">{item.camera}</p>
            </li>
            <li className="description__tech-specs-item">
              <p className="tdescription__tech-specs-title">Zoom</p>
              <p className="description__tech-specs-value">{item.zoom}</p>
            </li>
            <li className="description__tech-specs-item">
              <p className="tdescription__tech-specs-title">Cell</p>
              <p className="description__tech-specs-value">{item.cell}</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
