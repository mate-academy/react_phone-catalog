import { IconWithCounterProps } from '@/types/Product';

export const IconWithCounter = ({
  iconSrc,
  count,
  alt,
}: IconWithCounterProps) => {
  return (
    <div className="relative group-hover:scale-125 transition-all">
      <img src={iconSrc} alt={alt} />
      {count > 0 && (
        <span className="font-mont font-bold absolute -top-[6px] -right-[7px] bg-[#EB5757] text-text-color-base-white text-[10px] w-[14px] h-[14px] rounded-full flex items-center justify-center">
          {count}
        </span>
      )}
    </div>
  );
};
