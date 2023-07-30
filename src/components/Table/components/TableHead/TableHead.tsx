import { FC, ReactNode } from "react";

import { TableColumnValues, useTable } from "../../TableContext";

import sharedStyles from "../../shared/styles/Shared.module.scss";

export interface TableHeadProps {
  children: ReactNode;
}

export interface TableColumnProps
  extends Partial<Omit<TableColumnValues, "label">> {
  children: string;
}

export const TableHead: FC<TableHeadProps> = ({ children }) => {
  const { variant, columns } = useTable();

  if (variant === "compact") {
    return null;
  }

  return (
    <div
      className={`py-2 border-b border-violet-900 text-violet-900 bg-violet-50 font-bold grid grid-cols-${columns.length}`}
    >
      {children}
    </div>
  );
};

export const TableColumn: FC<TableColumnProps> = ({ children }) => {
  return <div>{children}</div>;
};
