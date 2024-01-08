/* eslint-disable no-console */
import { Colorcircle } from '../Colorcircle';

type Props = {
  color: string;
  set: (arg: string) => void;
};

export const PIckColor: React.FC<Props> = ({ color, set }) => {
  const twColor = () => {
    switch (color) {
      case 'White':
        return 'bg-[#F0F0F0]';

      case 'Gold':
        return 'bg-[#FCDBC1]';

      case 'Green':
        return 'bg-[#5F7170]';

      default:
        return 'bg-[#4C4C4C]';
    }
  };

  return (
    <>
      <Colorcircle bg="bg-[#FCDBC1]" color={twColor()} set={set} />
      <Colorcircle bg="bg-[#5F7170]" color={twColor()} set={set} />
      <Colorcircle bg="bg-[#4C4C4C]" color={twColor()} set={set} />
      <Colorcircle bg="bg-[#F0F0F0]" color={twColor()} set={set} />
    </>
  );
};
