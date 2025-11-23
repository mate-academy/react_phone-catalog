import { Accessory, Phone, Tablet } from '../../../../api/types';
import scss from './TechSpecs.module.scss';

interface Props {
  item: Phone | Tablet | Accessory;
  tech?: boolean;
}

export const TechSpecs: React.FC<Props> = ({ item, tech }) => {
  return (
    <dl className={scss.techSpecs}>
      <div className={scss.techSpecs__line}>
        <dt className={`${scss.techSpecs__text} ${scss.techSpecs__type}`}>
          Screen
        </dt>
        <dd className={`${scss.techSpecs__text} ${scss.techSpecs__value}`}>
          {item.screen}
        </dd>
      </div>
      <div className={scss.techSpecs__line}>
        <dt className={`${scss.techSpecs__text} ${scss.techSpecs__type}`}>
          Resolution
        </dt>
        <dd className={`${scss.techSpecs__text} ${scss.techSpecs__value}`}>
          {item.resolution}
        </dd>
      </div>
      <div className={scss.techSpecs__line}>
        <dt className={`${scss.techSpecs__text} ${scss.techSpecs__type}`}>
          Proccessor
        </dt>
        <dd className={`${scss.techSpecs__text} ${scss.techSpecs__value}`}>
          {item.processor}
        </dd>
      </div>
      <div className={scss.techSpecs__line}>
        <dt className={`${scss.techSpecs__text} ${scss.techSpecs__type}`}>
          RAM
        </dt>
        <dd className={`${scss.techSpecs__text} ${scss.techSpecs__value}`}>
          {item.ram}
        </dd>
      </div>
      {tech && (
        <>
          <div className={scss.techSpecs__line}>
            <dt className={`${scss.techSpecs__text} ${scss.techSpecs__type}`}>
              Built in memory
            </dt>
            <dd className={`${scss.techSpecs__text} ${scss.techSpecs__value}`}>
              {item.capacity}
            </dd>
          </div>
          {'camera' in item && (
            <div className={scss.techSpecs__line}>
              <dt className={`${scss.techSpecs__text} ${scss.techSpecs__type}`}>
                Camera
              </dt>
              <dd
                className={`${scss.techSpecs__text} ${scss.techSpecs__value}`}
              >
                {item.camera}
              </dd>
            </div>
          )}
          {'zoom' in item && (
            <div className={scss.techSpecs__line}>
              <dt className={`${scss.techSpecs__text} ${scss.techSpecs__type}`}>
                Zoom
              </dt>
              <dd
                className={`${scss.techSpecs__text} ${scss.techSpecs__value}`}
              >
                {item.zoom}
              </dd>
            </div>
          )}
          <div className={scss.techSpecs__line}>
            <dt className={`${scss.techSpecs__text} ${scss.techSpecs__type}`}>
              Cell
            </dt>
            <dd className={`${scss.techSpecs__text} ${scss.techSpecs__value}`}>
              {item.cell.join(', ')}
            </dd>
          </div>
        </>
      )}
    </dl>
  );
};
