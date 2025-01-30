import cl from './SectionTitle.module.scss';

type Props = {
  text: string;
  className?: string;
};

export const SectionTitle: React.FC<Props> = ({ text, className }) => (
  <h2 className={`${cl.title} ${className}`}>{text}</h2>
);
