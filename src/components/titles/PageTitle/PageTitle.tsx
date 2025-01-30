import cl from './PageTitle.module.scss';

type Props = {
  text: string;
  className?: string;
};

export const PageTitle: React.FC<Props> = ({ text, className }) => (
  <h1 className={`${cl.title} ${className}`}>{text}</h1>
);
