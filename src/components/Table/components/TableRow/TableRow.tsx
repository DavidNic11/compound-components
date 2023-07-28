import { ReactNode, FC, cloneElement, Children, ReactElement } from "react";

import { TableColumnValues, useTable } from "../../TableContext";
import { CompactWrapper } from "./TableRowCompact";
import { FullWrapper } from "./TableRowFull";
import { RowItemsProps } from "./components/TableRowItem";

export interface TableRowProps {
  variant?: "highlighted" | "default";
  children: ReactNode;
}

export const TableRow: FC<TableRowProps> = ({ children }) => {
  const { columns, variant } = useTable();

  const enrichedChildren = getEnrichedChildren(children, columns);

  if (variant === "compact") {
    return <CompactWrapper>{enrichedChildren}</CompactWrapper>;
  }

  return <FullWrapper>{enrichedChildren}</FullWrapper>;
};

const getEnrichedChildren = (
  children: ReactNode,
  columns: TableColumnValues[]
): ReactNode => {
  return Children.toArray(children).map((child, columnIndex) => {
    const rowItem = child as ReactElement<RowItemsProps>;
    const column = columns[columnIndex];

    return cloneElement(rowItem, {
      ...rowItem.props,
      ...column,
    });
  });
};
