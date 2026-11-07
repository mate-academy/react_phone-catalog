import cn from 'classnames';
import { Typography } from '../../atoms/Typography/Typography';

const spacingByTitleLevel = {
  h1: 'space-y-2',
  h3: 'space-y-1',
} as const;

type Props = {
  title: string;
  itemsCount: number;
  titleLevel?: keyof typeof spacingByTitleLevel;
  className?: string;
  countLabel?: string;
};

export const HeadingWithCount = ({
  title,
  itemsCount,
  titleLevel = 'h1',
  className,
  countLabel = 'models',
}: Props) => {
  return (
    <div className={cn(spacingByTitleLevel[titleLevel], className)}>
      <Typography level={titleLevel}>{title}</Typography>
      <Typography
        level="body"
        className="text-secondary"
      >
        {itemsCount} {countLabel}
      </Typography>
    </div>
  );
};
