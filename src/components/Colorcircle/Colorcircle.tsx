/* eslint-disable no-console */

import { useSearchParams } from 'react-router-dom';

type Props = {
  color: string;
  bg: string;
  set: (arg: string) => void;
};
export const Colorcircle: React.FC<Props> = ({ color, bg, set }) => {
  // setUrlParams
  const [urlParams, setUrlParams] = useSearchParams();

  const toColorName = () => {
    switch (bg) {
      case 'bg-[#F0F0F0]':
        return 'White';
      case 'bg-[#FCDBC1]':
        return 'Gold';
      case 'bg-[#5F7170]':
        return 'Green';
      default:
        return 'Black';
    }
  };

  return (
    <button
      type="button"
      onClick={() => {
        set(toColorName());
        urlParams.set('color', toColorName());
        setUrlParams(urlParams);
      }}
      className={`rounded-full border ${color === bg ? 'border-primary' : 'border-elements'}`}
    >
      <div className={`w-8 h-8 ${bg} rounded-full border-[2px] border-color-[transparent]`} />
    </button>
  );
};
