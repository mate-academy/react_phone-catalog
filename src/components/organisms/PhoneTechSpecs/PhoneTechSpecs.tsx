import { Typography } from '../../atoms/Typography/Typography';

type Props = {
  children: React.ReactNode;
};

export const PhoneTechSpecs: React.FC<Props> = ({ children }) => (
  <div>
    <Typography
      level="h3"
      className="pb-[16px] border-b-[1px] border-elements"
    >
      Tech Specs
    </Typography>
    <div className="pt-[30px] md:pt-[25px]">{children}</div>
  </div>
);
