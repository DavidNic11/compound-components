import { FC, ReactNode, createContext, useContext } from "react";
import { throwError } from "../../shared/utilities";

interface TabContextValues {
  activeTab: string;
  onTabChange: (newTab: string) => void;
}

const TabContext = createContext<TabContextValues | null>(null);

export const useTabs = () => {
  return (
    useContext(TabContext) ??
    throwError("Must use useTabs inside of TabProvider")
  );
};

interface TabProviderProps extends TabContextValues {
  children: ReactNode;
}

export const TabProvider: FC<TabProviderProps> = ({
  children,
  ...providerProps
}) => {
  return (
    <TabContext.Provider value={providerProps}>{children}</TabContext.Provider>
  );
};
