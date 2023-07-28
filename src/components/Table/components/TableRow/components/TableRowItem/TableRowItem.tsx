import { FC, ReactNode } from "react";
import { TableColumnValues, useTable } from "../../../../TableContext";

import sharedStyles from "../../../../shared/styles/Shared.module.scss";

import compactStyles from "./CompactRowItem.module.scss";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface InternalRowItemsProps extends TableColumnValues {}

export interface RowItemsProps extends InternalRowItemsProps {
  children: ReactNode;
}

const TableRowItem: FC<RowItemsProps> = ({ children, transform, label }) => {
  const { variant } = useTable();
  const transformedChildren = transform(children);

  if (variant === "compact") {
    return <CompactRowItem label={label}>{transformedChildren}</CompactRowItem>;
  }

  return <FullRowItem>{transformedChildren}</FullRowItem>;
};

export default TableRowItem as FC<
  Omit<RowItemsProps, keyof InternalRowItemsProps>
>;

interface CompactRowItem {
  label: string;
  children: ReactNode;
}

const CompactRowItem: FC<CompactRowItem> = ({ label, children }) => {
  return (
    <div className={compactStyles.container}>
      <div className={compactStyles.label}>{label}</div>
      <div>{children}</div>
    </div>
  );
};

interface FullRowItemProps {
  children?: ReactNode;
}

const FullRowItem: FC<FullRowItemProps> = ({ children }) => {
  return <div className={sharedStyles["row-item"]}>{children}</div>;
};
