import classNames from 'classnames';

type TitleProps = {
  children: React.ReactNode
  extraClassName?: string
};

export const Title = ({ children, extraClassName }: TitleProps) => {
  const titleClasses = classNames('title', extraClassName);

  return <h1 className={titleClasses}>{children}</h1>;
};

Title.defaultProps = {
  extraClassName: '',
};
