interface Props {
  name: 'heart' | 'heart-like' | 'cart' | 'arrow-left' | 'arrow-right';
  className?: string;
}

export const Icon = ({ name, className }: Props) => {
  return <img src={`/icon/${name}.svg`} alt={name} className={className} />;
};
