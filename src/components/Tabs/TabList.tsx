import { FC } from "react";
import { useTabs } from "./TabContext";

interface TabListProps {
  labels: string[];
}

export const TabList: FC<TabListProps> = ({ labels }) => {
  const { onTabChange } = useTabs();

  return (
    <div>
      {labels.map((label, index) => {
        return (
          <button key={`${label}${index}`} onClick={() => onTabChange(label)}>
            {label}
          </button>
        );
      })}
    </div>
  );
};
