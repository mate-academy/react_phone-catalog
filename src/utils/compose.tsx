import React from 'react';

type Props = {
  children: React.ReactNode;
};

type Provider = React.ComponentType<Props>;

export const compose = (providers: Provider[]) =>
  providers.reduce(
    (Prev, Curr) => {
      const ComposedProviders = function ComposedProviders({
        children,
      }: Props) {
        return (
          <Prev>
            <Curr>{children}</Curr>
          </Prev>
        );
      };

      return ComposedProviders;
    },
    function RootProvider({ children }: Props) {
      return <>{children}</>;
    },
  );
