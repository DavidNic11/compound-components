import {
  Children,
  FC,
  ReactElement,
  ReactNode,
  isValidElement,
  useCallback,
} from "react";
import { TabProvider } from "./TabContext";
import { useControlledState } from "../../shared/hooks/useControlledState";
import { TabItem, TabItemProps } from "./TabItem";
import { throwError } from "../../shared/utilities";
import { TabList } from "./TabList";

interface TabProps {
  children: ReactNode;
  activeTab?: string;
  onTabChange?: (newTab: string) => void;
}

const useFormattedTabs = ({
  children,
  onTabChange: onTabChangeProp,
  activeTab: activeTabProp,
}: TabProps) => {
  const labels = getLabels(children);

  const [activeTab, setActiveTab] = useControlledState({
    controlledValue: activeTabProp,
    defaultValue: labels[0],
  });

  if (!activeTab) {
    throw new Error("how tho?");
  }

  const onTabChange = useCallback(
    (newTab: string) => {
      setActiveTab(newTab);
      onTabChangeProp?.(newTab);
    },
    [onTabChangeProp]
  );

  return { activeTab, onTabChange, labels };
};

const getLabels = (children: ReactNode) => {
  return Children.toArray(children)
    .filter(isValidElement)
    .map((child) => {
      if (child.type !== TabItem) {
        throw new Error("Must use TabItems");
      }

      const tabItem = child as ReactElement<TabItemProps>;

      return tabItem.props.label;
    });
};

export const Tabs: FC<TabProps> = (props) => {
  const { labels, ...providerProps } = useFormattedTabs(props);

  return (
    <TabProvider {...providerProps}>
      <TabList labels={labels} />
      <div>{props.children}</div>
    </TabProvider>
  );
};
