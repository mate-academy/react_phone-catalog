import { SectionTitle } from '../../titles/SectionTitle';
import cl from './Categories.module.scss';

export const Categories: React.FC = () => {
  return (
    <div className={cl.sectionContainer}>
      <SectionTitle text="Shop by category" />
    </div>
  );
};
