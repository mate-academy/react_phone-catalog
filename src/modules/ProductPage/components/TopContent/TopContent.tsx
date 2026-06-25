import { PageTop } from '../../../../components/PageTop';
import { Model } from '../../../shared/types/Model';

import { ModelControls } from '../ModelControls';
import style from './TopContent.module.scss';

export const TopContent = ({
  model,
  onVariantChange,
}: {
  model: Model;
  onVariantChange: (color: string, capacity: string) => void;
}) => {
  return (
    <section className={style['top-content']}>
      <PageTop
        titleText={model?.name || ''}
        titleLevel={2}
        itemsContent={false}
        back={true}
      />
      <ModelControls model={model} onVariantChange={onVariantChange} />
    </section>
  );
};
