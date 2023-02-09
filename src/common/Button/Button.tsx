import './Button.scss';

export const Button = ({
  num, image, alt, className, onClick, imageClass, disabled
}: any) => {
  return (
    // <Link to={link}>
    <button
      onClick={onClick}
      className={`button-link ${className}`}
      disabled={disabled}
      type="button"
    >
      {/* <a
      onClick={onClick}
      className={`button-link ${className}`}
      href={link}
      // disabled={disabled}
      // style={style}
    > */}
      {
        num ? <div>{num}</div>
          : <img className={`button-image ${imageClass}`} src={image} alt={alt} />
      }
    </button>
  );
};
