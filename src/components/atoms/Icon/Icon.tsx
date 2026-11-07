import cn from 'classnames';

type Props = {
  src: string;
  isDisabled?: boolean;
  className?: string;
};

const RED_HEART_URL = '/icons/heart-filled.svg';

export const Icon: React.FC<Props> = ({ src, isDisabled, className }) => {
  const isRedHeart = src === RED_HEART_URL;

  return (
    <span
      className={cn(
        'inline-block w-4 h-4 bg-no-repeat bg-center bg-fit justify-center',
        {
          'bg-red dark:bg-red': isRedHeart,
          'bg-primary dark:bg-white': !isDisabled && !isRedHeart,
          'bg-icons dark:bg-icons-dark': isDisabled,
        },
        className,
      )}
      style={{
        maskImage: `url(${src})`,
        WebkitMaskImage: `url(${src})`,
        maskRepeat: 'no-repeat',
        maskPosition: 'center',
        maskSize: 'contain',
      }}
    />
  );
};
