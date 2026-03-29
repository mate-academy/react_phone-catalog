import { Section, SectionTitle } from '@/atoms';
import s from './Catalog.module.scss';
type Props = {
  title: string;
};

export const Catalog = ({ title }: Props) => {
  return (
    <Section>
      <SectionTitle>{title}</SectionTitle>
      <div className={s.catalog}></div>
    </Section>
  );
};
