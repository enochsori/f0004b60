import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';

interface ActivityContextProps {
  selectedOption: 'all' | 'inbound' | 'outbound';
  setSelectedOption: React.Dispatch<
    React.SetStateAction<'all' | 'inbound' | 'outbound'>
  >;
}

interface ActivityProviderProp {
  children: ReactNode;
}

export const ActivityContext = createContext<ActivityContextProps | undefined>(
  undefined
);

export const ActivityProvider = ({ children }: ActivityProviderProp) => {
  const [selectedOption, setSelectedOption] = useState<
    'all' | 'inbound' | 'outbound'
  >('all');

  return (
    <ActivityContext.Provider value={{ selectedOption, setSelectedOption }}>
      {children}
    </ActivityContext.Provider>
  );
};
