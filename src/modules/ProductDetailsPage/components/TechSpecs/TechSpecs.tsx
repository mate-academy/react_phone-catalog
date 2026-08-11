import classNames from 'classnames';
import { Accessory, Phone, Tablet } from '../../../../api/types';
import scss from './TechSpecs.module.scss';

interface Props {
  item: Phone | Tablet | Accessory;
  tech?: boolean;
  className?: string;
}

export const TechSpecs: React.FC<Props> = ({ item, tech, className }) => {
  return (
    <dl className={scss.techSpecs}>
      <div className={scss.techSpecs__line}>
        <dt
          className={classNames(
            scss.techSpecs__text,
            scss.techSpecs__type,
            className,
          )}
        >
          Screen
        </dt>
        <dd
          className={classNames(
            scss.techSpecs__text,
            scss.techSpecs__value,
            className,
          )}
        >
          {item.screen}
        </dd>
      </div>
      <div className={scss.techSpecs__line}>
        <dt
          className={classNames(
            scss.techSpecs__text,
            scss.techSpecs__type,
            className,
          )}
        >
          Resolution
        </dt>
        <dd
          className={classNames(
            scss.techSpecs__text,
            scss.techSpecs__value,
            className,
          )}
        >
          {item.resolution}
        </dd>
      </div>
      <div className={scss.techSpecs__line}>
        <dt
          className={classNames(
            scss.techSpecs__text,
            scss.techSpecs__type,
            className,
          )}
        >
          Proccessor
        </dt>
        <dd
          className={classNames(
            scss.techSpecs__text,
            scss.techSpecs__value,
            className,
          )}
        >
          {item.processor}
        </dd>
      </div>
      <div className={scss.techSpecs__line}>
        <dt
          className={classNames(
            scss.techSpecs__text,
            scss.techSpecs__type,
            className,
          )}
        >
          RAM
        </dt>
        <dd
          className={classNames(
            scss.techSpecs__text,
            scss.techSpecs__value,
            className,
          )}
        >
          {item.ram}
        </dd>
      </div>
      {tech && (
        <>
          <div className={scss.techSpecs__line}>
            <dt
              className={classNames(
                scss.techSpecs__text,
                scss.techSpecs__type,
                className,
              )}
            >
              Built in memory
            </dt>
            <dd
              className={classNames(
                scss.techSpecs__text,
                scss.techSpecs__value,
                className,
              )}
            >
              {item.capacity}
            </dd>
          </div>
          {'camera' in item && (
            <div className={scss.techSpecs__line}>
              <dt
                className={classNames(
                  scss.techSpecs__text,
                  scss.techSpecs__type,
                  className,
                )}
              >
                Camera
              </dt>
              <dd
                className={classNames(
                  scss.techSpecs__text,
                  scss.techSpecs__value,
                  className,
                )}
              >
                {item.camera}
              </dd>
            </div>
          )}
          {'zoom' in item && (
            <div className={scss.techSpecs__line}>
              <dt
                className={classNames(
                  scss.techSpecs__text,
                  scss.techSpecs__type,
                  className,
                )}
              >
                Zoom
              </dt>
              <dd
                className={classNames(
                  scss.techSpecs__text,
                  scss.techSpecs__value,
                  className,
                )}
              >
                {item.zoom}
              </dd>
            </div>
          )}
          <div className={scss.techSpecs__line}>
            <dt
              className={classNames(
                scss.techSpecs__text,
                scss.techSpecs__type,
                className,
              )}
            >
              Cell
            </dt>
            <dd
              className={classNames(
                scss.techSpecs__text,
                scss.techSpecs__value,
                className,
              )}
            >
              {item.cell.join(', ')}
            </dd>
          </div>
        </>
      )}
    </dl>
  );
};
