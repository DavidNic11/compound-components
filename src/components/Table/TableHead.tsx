import { FC, ReactNode } from "react";
import cn from "classnames";
import { TableColumnValues, useTable } from "./TableContext";

import sharedStyles from "./Shared.module.scss";
import tableHeadStyles from "./TableHead.module.scss";

export interface TableHeadProps {
  children: ReactNode;
}

export interface TableColumnProps
  extends Partial<Omit<TableColumnValues, "label">> {
  children: string;
}

export const TableHead: FC<TableHeadProps> = ({ children }) => {
  const { embeddable, variant } = useTable();

  if (variant === "compact") {
    return null;
  }

  return (
    <div className={cn(sharedStyles.row, tableHeadStyles.head)}>
      {embeddable && <div className={cn(sharedStyles.column)}>chev</div>}
      {children}
    </div>
  );
};

export const TableColumn: FC<TableColumnProps> = ({ children }) => {
  return <div className={sharedStyles.column}>{children}</div>;
};
