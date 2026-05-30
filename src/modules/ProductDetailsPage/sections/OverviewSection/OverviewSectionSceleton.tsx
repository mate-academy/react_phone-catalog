/* eslint-disable max-len */
import classNames from 'classnames';
import styles from './OverviewSection.module.scss';
import { SkeletonGallery } from '../../components/Gallery/SkeletonGallery';
import { SkeletonPanelOptions } from '../../components/PanelOptions/SkeletonPanelOptions';

export const OverviewSectionSceleton: React.FC = () => {
  return (
    <section className={classNames(styles.Overview, 'main__content')}>
      <SkeletonGallery />
      <SkeletonPanelOptions />
    </section>
  );
};
