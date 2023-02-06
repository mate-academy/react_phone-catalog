import './Button.scss';

export const Button = ({
  num, image, alt, className, onClick, link,
}: any) => {
  return (
    <a onClick={onClick} className={`button-link ${className}`} href={link}>
      {
        num ? <div>{num}</div>
          : <img className="button-image" src={image} alt={alt} />
      }
    </a>
  );
};
