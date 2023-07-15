import type { FC, ReactNode } from "react";

import { createContext, useContext } from "react";

export type TabValue = number | string;

interface TabContext {
  selectedTab?: TabValue;
  onTabChange: (newTab: TabValue) => void;
}

const TabContext = createContext<TabContext | null>(null);

const huck = (message: string): never => {
  throw new Error(message);
};

export const useTabs = (): TabContext => {
  const context = useContext(TabContext);

  if (!context) {
    throw new Error("");
  }

  return context;
};

export const useTabs2 = (): TabContext => {
  return useContext(TabContext) ?? huck("");
};

interface TabProviderProps extends TabContext {
  children?: ReactNode;
}

export const TabProvider: FC<TabProviderProps> = ({
  children,
  selectedTab,
  onTabChange,
}) => {
  return (
    <TabContext.Provider value={{ selectedTab, onTabChange }}>
      {children}
    </TabContext.Provider>
  );
};
