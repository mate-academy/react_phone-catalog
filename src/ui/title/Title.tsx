import { FC } from 'react';

type TitleProps = {
  level: 1 | 2 | 3 | 4 | 5 | 6;
  id?: string;
  children: React.ReactNode;
};

export const Title: FC<TitleProps> = ({ level, children, id }) => {
  const Tag = `h${level}` as keyof JSX.IntrinsicElements;

  return <Tag id={id}>{children}</Tag>;
};
