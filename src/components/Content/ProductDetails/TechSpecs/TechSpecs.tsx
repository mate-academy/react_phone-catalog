import { Details } from '../../../../type/Details';
import style from './TechSpecs.module.scss';

type Props = {
  details: Details;
};

export const TechSpecs: React.FC<Props> = ({ details }) => {
  const { screen, resolution, processor, ram, capacity, camera, zoom, cell } =
    details;

  return (
    <div className={style.container}>
      <span className={style.container__title}>Tech specs</span>{' '}
      <div className={style.container__techSpecs}>
        <div className={style.container__techSpecs_item}>
          <span className={style.container__techSpecs_title}>Screen</span>
          <span className={style.container__techSpecs_value}>{screen}</span>
        </div>
        <div className={style.container__techSpecs_item}>
          <span className={style.container__techSpecs_title}>Resolution</span>
          <span className={style.container__techSpecs_value}>{resolution}</span>
        </div>
        <div className={style.container__techSpecs_item}>
          <span className={style.container__techSpecs_title}>Processor</span>
          <span className={style.container__techSpecs_value}>{processor}</span>
        </div>
        <div className={style.container__techSpecs_item}>
          <span className={style.container__techSpecs_title}>RAM</span>
          <span className={style.container__techSpecs_value}>{ram}</span>
        </div>
        <div className={style.container__techSpecs_item}>
          <span className={style.container__techSpecs_title}>
            Built in memory
          </span>
          <span className={style.container__techSpecs_value}>{capacity}</span>
        </div>
        <div className={style.container__techSpecs_item}>
          <span className={style.container__techSpecs_title}>Camera</span>
          <span className={style.container__techSpecs_value}>{camera}</span>
        </div>
        <div className={style.container__techSpecs_item}>
          <span className={style.container__techSpecs_title}>Zoom</span>
          <span className={style.container__techSpecs_value}>{zoom}</span>
        </div>
        <div className={style.container__techSpecs_item}>
          <span className={style.container__techSpecs_title}>Cell</span>
          <span className={style.container__techSpecs_value}>
            {cell.join(', ')}
          </span>
        </div>
      </div>
    </div>
  );
};
