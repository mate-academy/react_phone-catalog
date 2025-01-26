import { createContext, ReactNode, useState } from 'react';
import { Person } from '../types/Phone';

export const PeopleContext = createContext<{
  people: Person[];
  setPeople: React.Dispatch<React.SetStateAction<Person[] | []>>;
  isError: string;
  setIsError: React.Dispatch<React.SetStateAction<string>>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  noMatch: boolean;
  setNoMatch: React.Dispatch<React.SetStateAction<boolean>>;
}>({
  people: [],
  setPeople: () => {},
  isError: '',
  setIsError: () => {},
  loading: false,
  setLoading: () => {},
  noMatch: false,
  setNoMatch: () => {},
});

export const PeopleProvider = ({ children }: { children: ReactNode }) => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isError, setIsError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [noMatch, setNoMatch] = useState<boolean>(false);

  return (
    <PeopleContext.Provider
      value={{
        people,
        setPeople,
        isError,
        setIsError,
        loading,
        setLoading,
        noMatch,
        setNoMatch,
      }}
    >
      {children}
    </PeopleContext.Provider>
  );
};
