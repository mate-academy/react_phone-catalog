import cn from 'classnames';
import { Icon } from '../../atoms/Icon/Icon';

type Props = {
  src: string;
  notification: number;
  className?: string;
};

export const IconNotification: React.FC<Props> = ({
  src,
  notification = 0,
  className,
}) => {
  return (
    <span
      className={cn(
        'relative flex items-center justify-center w-[28px] h-[28px]',
        className,
      )}
    >
      <Icon
        src={src}
        className="size-full"
      />

      <span
        className="
        absolute
        flex
        items-center
        justify-center
        top-0
        right-0
        size-[14px]
        rounded-full 
        border 
        border-white
        bg-red
      "
      >
        <p className="text-white text-[9px] leading-[100%] font-mont font-semibold absolute bottom-0.25">
          {notification}
        </p>
      </span>
    </span>
  );
};
