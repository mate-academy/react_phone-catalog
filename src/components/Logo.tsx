import classNames from 'classnames';

type LogoProps = {
  imageExtraClass?: string
};

export const Logo = ({ imageExtraClass }: LogoProps) => {
  const imageClasses = classNames('logo', imageExtraClass);

  return (
    <img
      src="img/logo.svg"
      alt="Logo"
      className={imageClasses}
    />
  );
};

Logo.defaultProps = {
  imageExtraClass: '',
};
