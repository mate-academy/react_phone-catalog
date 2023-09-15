import React, { useCallback, useState } from 'react';
import debounce from 'lodash.debounce';

type Query = {
  appliedQuery: string;
  applyQuery: (query: string) => void;
};

export const QueryContext = React.createContext<Query>({
  appliedQuery: '',
  applyQuery: () => {},
});

type Props = {
  children: React.ReactNode;
};

export const QueryProvider: React.FC<Props> = ({
  children,
}) => {
  const [appliedQuery, setAppliedQuery] = useState('');
  const applyQuery = useCallback(
    debounce(setAppliedQuery, 1000),
    [],
  );

  return (
    <QueryContext.Provider value={{ appliedQuery, applyQuery }}>
      {children}
    </QueryContext.Provider>
  );
};
