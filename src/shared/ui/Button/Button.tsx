import { Button as ButtonPrimitive } from '@base-ui/react/button';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/shared/lib';

export const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center rounded-lg border border-transparent bg-clip-padding text-sm font-medium whitespace-nowrap transition-all outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 active:not-aria-[haspopup]:translate-y-px disabled:pointer-events-none disabled:opacity-50 cursor-pointer aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/80',
        outline:
          'border-border bg-background hover:bg-muted hover:text-foreground',
        secondary:
          'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        ghost: 'hover:bg-muted hover:text-foreground',
        destructive: 'bg-red/10 text-red hover:bg-red/20',
        link: 'text-primary underline-offset-4 hover:underline',
        pagination:
          'rounded-none bg-brand-surface-1 text-white hover:bg-brand-elements text-sm font-semibold aria-[current=page]:bg-brand-accent',
        control:
          'rounded-none bg-brand-surface-2 text-white hover:bg-brand-icons disabled:bg-brand-black disabled:border disabled:border-brand-elements disabled:!opacity-100 disabled:[&_svg]:text-[var(--color-brand-icons)]',
        favorite:
          'rounded-none bg-brand-surface-2 text-white hover:bg-brand-icons aria-pressed:bg-brand-black aria-pressed:border aria-pressed:border-brand-elements aria-pressed:text-brand-red',
        close: 'rounded-none text-brand-secondary hover:text-brand-white',
        primary:
          'rounded-none bg-brand-accent text-brand-white hover:bg-brand-accent-600 aria-pressed:bg-brand-surface-2 text-sm font-semibold',
        transparent:
          'rounded-none bg-transparent text-brand-white hover:text-brand-accent text-sm font-semibold',
      },
      size: {
        default:
          'h-8 gap-1.5 px-2.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2',
        xs: "h-6 gap-1 rounded-[min(var(--radius-md),10px)] px-2 text-xs in-data-[slot=button-group]:rounded-lg has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3",
        sm: "h-7 gap-1 rounded-[min(var(--radius-md),12px)] px-2.5 text-[0.8rem] in-data-[slot=button-group]:rounded-lg has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3.5",
        lg: 'h-9 gap-1.5 px-2.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2',
        icon: 'size-8',
        'icon-xs':
          "size-6 rounded-[min(var(--radius-md),10px)] in-data-[slot=button-group]:rounded-lg [&_svg:not([class*='size-'])]:size-3",
        'icon-sm':
          'size-7 rounded-[min(var(--radius-md),12px)] in-data-[slot=button-group]:rounded-lg',
        'icon-lg': 'size-9',
        'sq-8': 'size-8',
        'sq-10': 'size-10',
      },
    },
    compoundVariants: [
      { variant: 'pagination', class: 'size-8' },
      { variant: 'control', class: 'size-8' },
      { variant: 'favorite', class: 'size-10' },
      { variant: 'close', class: 'size-4' },
    ],
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

interface ButtonProps
  extends ButtonPrimitive.Props, VariantProps<typeof buttonVariants> {}

export const Button = ({
  className,
  variant = 'default',
  size = 'default',
  ...props
}: ButtonProps) => {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
};
