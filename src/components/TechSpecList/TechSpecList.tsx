import { TechSpecItem } from '../TechSpecItem';

type TechSpecListProps = {
  techSpecs: [string, string | string[]][]
};

export const TechSpecList: React.FC<TechSpecListProps> = ({
  techSpecs,
}) => {
  return (
    <>
      {techSpecs.map(spec => {
        const property = spec[0];
        const value = spec[1];

        return (
          <TechSpecItem
            key={property}
            property={property}
            value={value}
          />
        );
      })}
    </>
  );
};
