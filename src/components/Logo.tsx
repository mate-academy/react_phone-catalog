type LogoProps = {
  imageClasses: string
};

export const Logo = ({ imageClasses }: LogoProps) => (
  <img
    src="img/logo.svg"
    alt="Logo"
    className={imageClasses}
  />
);
