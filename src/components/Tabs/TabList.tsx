import type { FC } from "react";

import cn from "classnames";

import { useTabs } from "./TabContext";

interface TabListProps {
  labels: string[];
}

export const TabList: FC<TabListProps> = ({ labels }) => {
  const { onTabChange, activeTab } = useTabs();

  const { className, getActiveStyling } = useTabListStyles();

  return (
    <div className="flex justify-between items-center">
      {labels.map((label, index) => {
        return (
          <button
            key={`${label}${index}`}
            onClick={() => onTabChange(label)}
            className={cn(className, getActiveStyling(label === activeTab))}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
};

const useTabListStyles = () => {
  return {
    className: "flex-1 capitalize p-2",
    getActiveStyling: (isActive: boolean) => {
      if (!isActive) return;

      return "border-b-2 border-violet-800 text-violet-800 bg-violet-50 rounded-t-sm";
    },
  };
};
