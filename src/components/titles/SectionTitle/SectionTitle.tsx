import cl from './SectionTitle.module.scss';

type Props = {
  text: string;
};

export const SectionTitle: React.FC<Props> = ({ text }) => (
  <h2 className={cl.title}>{text}</h2>
);
