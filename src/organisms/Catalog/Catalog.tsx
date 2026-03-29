import { Dropdown, Section } from '@/atoms';
import s from './Catalog.module.scss';
type Props = {
  title: string;
};

export const Catalog = ({ title }: Props) => {
  const options = [
    'first',
    'second',
    'third',
    'first',
    'second',
    'third',
    'first',
    'second',
    'third',
    'first',
    'second',
    'third',
  ];

  return (
    <Section>
      <Section.Title>{title}</Section.Title>
      <div className={s.catalog}></div>
      <Dropdown label="text" options={options} />
    </Section>
  );
};
