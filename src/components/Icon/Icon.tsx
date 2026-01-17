interface Props {
  name: 'heart' | 'heart-like' | 'cart' | 'arrow-left' | 'arrow-right' | 'Logo';
  className?: string;
  format?: string;
}

export const Icon = ({ name, className, format = 'svg' }: Props) => {
  return (
    <img src={`/icon/${name}.${format}`} alt={name} className={className} />
  );
};
