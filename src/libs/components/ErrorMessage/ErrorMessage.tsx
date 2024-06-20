import cn from 'classnames';

type Props = {
  title: string;
  classNames?: string;
};

export const ErrorMessage: React.FC<Props> = ({ title, classNames }) => {
  return (
    <h1
      className={cn(classNames)}
      style={{
        paddingTop: '24px',
      }}
    >
      {title}
    </h1>
  );
};
