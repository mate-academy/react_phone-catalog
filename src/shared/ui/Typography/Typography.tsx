'use client';

import { type ComponentPropsWithoutRef } from 'react';

import { cn } from '@/shared/lib/utils';

type BodyTextProps = ComponentPropsWithoutRef<'p'>;

export const BodyText = ({ className, children, ...props }: BodyTextProps) => {
  return (
    <p
      className={cn('text-[14px] leading-5.25 font-normal', className)}
      {...props}
    >
      {children}
    </p>
  );
};

type H1Props = ComponentPropsWithoutRef<'h1'>;

export const H1 = ({ className, children, ...props }: H1Props) => {
  return (
    <h1
      className={cn(
        'text-[32px] leading-10.25 font-bold tracking-[-0.01em] sm:text-[48px] md:leading-14',
        className,
      )}
      {...props}
    >
      {children}
    </h1>
  );
};

type H2Props = ComponentPropsWithoutRef<'h2'>;

export const H2 = ({ className, children, ...props }: H2Props) => {
  return (
    <h2
      className={cn(
        'text-[22px] leading-7.75 font-bold sm:text-[32px] sm:leading-10.25 sm:tracking-[-0.01em]',
        className,
      )}
      {...props}
    >
      {children}
    </h2>
  );
};

type H3Props = ComponentPropsWithoutRef<'h3'>;

export const H3 = ({ className, children, ...props }: H3Props) => {
  return (
    <h3
      className={cn(
        'text-[20px] leading-6.5 font-semibold sm:text-[22px] sm:leading-7.75 md:font-bold',
        className,
      )}
      {...props}
    >
      {children}
    </h3>
  );
};

type H4Props = ComponentPropsWithoutRef<'h4'>;

export const H4 = ({ className, children, ...props }: H4Props) => {
  return (
    <h4
      className={cn(
        'text-[16px] leading-5 font-semibold sm:text-[20px] sm:leading-6.5',
        className,
      )}
      {...props}
    >
      {children}
    </h4>
  );
};

type SmallTextProps = ComponentPropsWithoutRef<'p'>;

export const SmallText = ({
  className,
  children,
  ...props
}: SmallTextProps) => {
  return (
    <p
      className={cn('text-[12px] leading-3.75 font-semibold', className)}
      {...props}
    >
      {children}
    </p>
  );
};

type UppercaseTextProps = ComponentPropsWithoutRef<'p'>;

export const UppercaseText = ({
  className,
  children,
  ...props
}: UppercaseTextProps) => {
  return (
    <p
      className={cn(
        'text-[12px] leading-2.75 font-bold uppercase tracking-[0.04em]',
        className,
      )}
      {...props}
    >
      {children}
    </p>
  );
};
