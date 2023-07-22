import { ReactNode, FC, cloneElement, Children, ReactElement } from "react";
import { useTable } from "../Table";

import { CompactWrapper } from "./TableRowCompact";
import { FullWrapper } from "./TableRowFull";
import { RowItemsProps } from "./components/TableRowItem";

export interface TableRowProps {
  variant?: "highlighted" | "default";
  children: ReactNode;
}

export const TableRow: FC<TableRowProps> = ({ children }) => {
  const { columns, variant } = useTable();

  const newChildren = Children.toArray(children).map((child, columnIndex) => {
    const rowItem = child as ReactElement<RowItemsProps>;
    const column = columns[columnIndex];

    return cloneElement(rowItem, {
      ...rowItem.props,
      ...column,
    });
  });

  if (variant === "compact") {
    return <CompactWrapper>{newChildren}</CompactWrapper>;
  }

  return <FullWrapper>{newChildren}</FullWrapper>;
};
