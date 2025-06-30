import style from './ProductSpecs.module.scss';

export type Spec = {
  name: string;
  value: string;
};

type ProductSpecsProps = {
  specs: Spec[];
};

export const ProductSpecs: React.FC<ProductSpecsProps> = ({ specs }) => {
  return (
    <div className={style.cardDescription}>
      {specs.map(spec => (
        <div key={spec.name} className={style.specs}>
          <p className={style.specsName}>{spec.name}</p>
          <p className={style.value}>{spec.value}</p>
        </div>
      ))}
    </div>
  );
};
