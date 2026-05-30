import { useMemo } from 'react';
import { ModelInfoSection } from '../ModelInfoSection';
import styles from './ModelInfo.module.scss';
import { Model } from '../../../shared/types/Model';

export const ModelInfo = ({ model }: { model: Model }) => {
  const characteristics = useMemo(
    () => [
      'screen',
      'resolution',
      'processor',
      'ram',
      'capacity',
      'camera',
      'zoom',
      'cell',
    ],
    [],
  );

  const description = model?.description || [];

  return (
    <section className={styles['model-info']}>
      <ModelInfoSection type="about" data={description} model={model} />
      <ModelInfoSection type="specs" data={characteristics} model={model} />
    </section>
  );
};
