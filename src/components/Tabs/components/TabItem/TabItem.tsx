import { FC, ReactNode } from "react";
import { useTabs } from "../../TabContext";

export interface TabItemProps {
  label: string;
  children: ReactNode;
}

export const TabItem: FC<TabItemProps> = ({ label, children }) => {
  const { activeTab } = useTabs();

  if (label !== activeTab) {
    return null;
  }

  return <>{children}</>;
};
