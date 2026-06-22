'use client';

import { Select as SelectPrimitive } from '@base-ui/react/select';
import { CheckIcon } from 'lucide-react';
import * as React from 'react';

import { cn } from '@/shared/lib/utils';
import { ChevronDownIcon, ChevronUpIcon } from '@/shared/ui/Icons';

export const Select = SelectPrimitive.Root;

export const SelectGroup = ({
  className,
  ...props
}: SelectPrimitive.Group.Props) => {
  return (
    <SelectPrimitive.Group
      data-slot="select-group"
      className={cn('scroll-my-1 p-0', className)}
      {...props}
    />
  );
};

export const SelectValue = ({
  className,
  ...props
}: SelectPrimitive.Value.Props) => {
  return (
    <SelectPrimitive.Value
      data-slot="select-value"
      className={cn('flex flex-1 text-left text-[14px]!', className)}
      {...props}
    />
  );
};

interface SelectTriggerProps extends SelectPrimitive.Trigger.Props {
  size?: 'sm' | 'default';
}

export const SelectTrigger = ({
  className,
  size = 'default',
  children,
  ...props
}: SelectTriggerProps) => {
  return (
    <SelectPrimitive.Trigger
      data-slot="select-trigger"
      data-size={size}
      className={cn(
        "flex w-full items-center justify-between data-popup-open:ring-1 data-popup-open:ring-brand-accent not-only-of-type: gap-1.5 bg-background bg-brand-surface-2 hover:bg-muted/50 py-2 px-3 text-sm whitespace-nowrap outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring disabled:cursor-not-allowed aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive data-placeholder:text-muted-foreground data-[size=default]:h-10 data-[size=sm]:h-7 data-[size=sm]:rounded-[min(var(--radius-md),10px)] *:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center *:data-[slot=select-value]:gap-1.5 dark:bg-popover dark:hover:bg-muted/50 dark:aria-invalid:border-destructive dark:aria-invalid:ring-destructive [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 cursor-pointer transition-colors duration-150 disabled:pointer-events-none disabled:opacity-50 data-[state=open]:bg-muted/50",
        className,
      )}
      {...props}
    >
      {children}
      <SelectPrimitive.Icon className="flex items-center justify-center transition-transform duration-200 data-popup-open:rotate-180 text-muted-foreground text-brand-secondary hover:text-brand-icons">
        <span
          className="h-4 w-4 bg-current block"
          style={{
            mask: 'url("/icons/Chevron (Arrow Down).svg") no-repeat center / contain',
            WebkitMask:
              'url("/icons/Chevron (Arrow Down).svg") no-repeat center / contain',
          }}
        />
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  );
};

interface SelectContentProps
  extends
    SelectPrimitive.Popup.Props,
    Pick<
      SelectPrimitive.Positioner.Props,
      'align' | 'alignOffset' | 'side' | 'sideOffset' | 'alignItemWithTrigger'
    > {}

export const SelectContent = ({
  className,
  children,
  side = 'bottom',
  sideOffset = 4,
  align = 'start',
  alignOffset = 0,
  alignItemWithTrigger = false,
  ...props
}: SelectContentProps) => {
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Positioner
        side={side}
        sideOffset={sideOffset}
        align={align}
        alignOffset={alignOffset}
        alignItemWithTrigger={alignItemWithTrigger}
        className="z-1500"
      >
        <SelectPrimitive.Popup
          data-slot="select-content"
          data-align-trigger={alignItemWithTrigger}
          className={cn(
            'relative isolate z-1500 translate-x-0! max-h-(--available-height) w-(--anchor-width) min-w-[--anchor-width] overflow-x-hidden overflow-y-auto bg-brand-black text-popover-foreground rounded-none shadow-md ring-1 ring-brand-elements duration-100 data-[align-trigger=true]:animate-none data-[side=bottom]:slide-in-from-top-2 data-[side=inline-end]:slide-in-from-left-2 data-[side=inline-start]:slide-in-from-right-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95',
            className,
          )}
          {...props}
        >
          <SelectPrimitive.List>{children}</SelectPrimitive.List>
        </SelectPrimitive.Popup>
      </SelectPrimitive.Positioner>
    </SelectPrimitive.Portal>
  );
};

export const SelectLabel = ({
  className,
  ...props
}: SelectPrimitive.GroupLabel.Props) => {
  return (
    <SelectPrimitive.GroupLabel
      data-slot="select-label"
      className={cn('px-1.5 py-1 text-xs text-muted-foreground', className)}
      {...props}
    />
  );
};

export const SelectItem = ({
  className,
  children,
  ...props
}: SelectPrimitive.Item.Props) => {
  return (
    <SelectPrimitive.Item
      data-slot="select-item"
      className={cn(
        "group relative hover:bg-brand-surface-2 h-10 flex w-full cursor-pointer items-center gap-1.5 bg-brand-black pr-8 pl-3 text-sm outline-hidden select-none focus:bg-accent focus:text-accent-foreground not-data-[variant=destructive]:focus:**:text-accent-foreground data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 *:[span]:last:flex *:[span]:last:items-center *:[span]:last:gap-2 transition-none",
        className,
      )}
      {...props}
    >
      <SelectPrimitive.ItemText className="flex flex-1 shrink-0 gap-2 whitespace-nowrap text-brand-secondary group-hover:text-brand-white transition-none">
        {children}
      </SelectPrimitive.ItemText>
      <SelectPrimitive.ItemIndicator
        render={
          <span className="pointer-events-none absolute right-3 flex size-4 items-center justify-center text-brand-secondary" />
        }
      >
        <CheckIcon className="pointer-events-none" />
      </SelectPrimitive.ItemIndicator>
    </SelectPrimitive.Item>
  );
};

export const SelectSeparator = ({
  className,
  ...props
}: SelectPrimitive.Separator.Props) => {
  return (
    <SelectPrimitive.Separator
      data-slot="select-separator"
      className={cn('pointer-events-none -mx-1 my-1 h-px bg-border', className)}
      {...props}
    />
  );
};

export const SelectScrollUpButton = ({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.ScrollUpArrow>) => {
  return (
    <SelectPrimitive.ScrollUpArrow
      data-slot="select-scroll-up-button"
      className={cn(
        "top-0 z-10 flex w-full cursor-default items-center justify-center bg-popover py-1 [&_svg:not([class*='size-'])]:size-4",
        className,
      )}
      {...props}
    >
      <ChevronUpIcon />
    </SelectPrimitive.ScrollUpArrow>
  );
};

export const SelectScrollDownButton = ({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.ScrollDownArrow>) => {
  return (
    <SelectPrimitive.ScrollDownArrow
      data-slot="select-scroll-down-button"
      className={cn(
        "bottom-0 z-10 flex w-full cursor-default items-center justify-center bg-popover py-1 [&_svg:not([class*='size-'])]:size-4",
        className,
      )}
      {...props}
    >
      <ChevronDownIcon />
    </SelectPrimitive.ScrollDownArrow>
  );
};
