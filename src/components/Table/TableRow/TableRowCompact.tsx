import {
  Children,
  FC,
  ReactElement,
  ReactNode,
  isValidElement,
  useState,
} from "react";

import { RowItemsProps } from "./components/TableRowItem";

interface TableRowCompactProps {
  children?: ReactNode;
}

interface CompactProps {
  children?: ReactNode;
  other?: ReactNode;
}

const Compact: FC<CompactProps> = ({ children, other }) => {
  const [show, setShow] = useState(false);
  return (
    <>
      <button onClick={() => setShow(!show)}>toggle</button>
      {children}
      {show && other}
    </>
  );
};

export const CompactWrapper: FC<TableRowCompactProps> = ({ children }) => {
  const [summary, other] = divideChildren(children);

  return <Compact other={other}>{summary}</Compact>;
};

const divideChildren = (
  children?: ReactNode
): [ReactElement<RowItemsProps>[], ReactElement<RowItemsProps>[]] => {
  return Children.toArray(children)
    .filter(isValidElement)
    .reduce(
      ([summaryChildren, otherChildren], child) => {
        const rowItem = child as ReactElement<RowItemsProps>;

        if (rowItem.props?.summary) {
          return [[...summaryChildren, rowItem], otherChildren];
        }

        return [summaryChildren, [...otherChildren, rowItem]];
      },
      [[], []] as [ReactElement<RowItemsProps>[], ReactElement<RowItemsProps>[]]
    );
};
