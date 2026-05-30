import { Accessories } from '../../../types/AccessoriesType';
import { Category } from '../../../types/CategoryEnum';
import { Phone } from '../../../types/PhoneType';
import { Tablet } from '../../../types/TabletType';

type Props = {
  device: Phone | Tablet | Accessories | null | undefined;
};

export const TechSpecs: React.FC<Props> = ({ device }) => {
  return (
    <div className="tech-specs">
      <h3 className="tech-specs__title">Tech specs</h3>

      <div className="tech-specs__line"></div>

      <div
        className="
                  characteristic tech-specs__characteristic
                "
      >
        <div className="characteristic__block">
          Scren
          <label className="characteristic__label">{device?.screen}</label>
        </div>
        <div className="characteristic__block">
          Resolution
          <label className="characteristic__label">{device?.resolution}</label>
        </div>
        <div className="characteristic__block">
          Processor
          <label className="characteristic__label">{device?.processor}</label>
        </div>
        <div className="characteristic__block">
          RAM
          <label className="characteristic__label">{device?.ram}</label>
        </div>
        <div className="characteristic__block">
          Built in memory
          <label className="characteristic__label">{device?.capacity}</label>
        </div>
        {(device?.category === Category.phones ||
          device?.category === Category.tablets) && (
          <div className="characteristic__block">
            Camera
            <label className="characteristic__label">{device?.camera}</label>
          </div>
        )}
        {(device?.category === Category.phones ||
          device?.category === Category.tablets) && (
          <div className="characteristic__block">
            Zoom
            <label className="characteristic__label">{device?.zoom}</label>
          </div>
        )}
        <div className="characteristic__block">
          Cell
          <label className="characteristic__label">
            {device?.cell.join(', ')}
          </label>
        </div>
      </div>
    </div>
  );
};
