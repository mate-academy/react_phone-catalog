import { AccessoriesModel, PhoneModel, TabletModel } from '../../types/model';
import { Product } from '../../types/products';
import { ModelCard } from '../ModelCard/ModelCard';
import styles from './ModelList.module.scss';

interface Props {
  models: PhoneModel[] | AccessoriesModel[] | TabletModel[] | Product[];
  kindOfModel: 'phones' | 'accessories' | 'tablets' | 'product';
}

export const ModelList: React.FC<Props> = ({ models, kindOfModel }) => {
  return (
    <ul className={styles.models__list}>
      {models.map(model => (
        <li key={model.id} className={styles.model__item}>
          <ModelCard kindOfModel={kindOfModel} model={model} hotPrice={false} />
        </li>
      ))}
    </ul>
  );
};
