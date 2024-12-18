import cl from './PageTitle.module.scss';

type Props = {
  text: string;
};

export const PageTitle: React.FC<Props> = ({ text }) => (
  <h1 className={cl.title}>{text}</h1>
);
