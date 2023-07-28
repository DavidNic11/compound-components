import { Children, FC, ReactElement, ReactNode, isValidElement } from "react";
import { throwError } from "../../shared/utilities";

import { TableBody, TableBodyProps } from "./components/TableBody/TableBody";
import { TableRowEmbed, TableRowProps } from "./components/TableRow";
import {
  TableColumnProps,
  TableHead,
  TableHeadProps,
} from "./components/TableHead";

import {
  TableColumnValues,
  TableContextValues,
  TableProvider,
} from "./TableContext";
import { useTableVariant } from "./hooks/useTableVariant";

import tableStyles from "./Table.module.scss";
interface TableProps {
  children: ReactNode;
  variant?: TableContextValues["variant"];
}

export const Table: FC<TableProps> = ({ children, variant: variantProp }) => {
  const variant = useTableVariant(variantProp);

  const embeddable = getEmbeddable(children);
  const columns = getColumns(children);

  return (
    <div className={tableStyles.table}>
      <TableProvider
        variant={variant}
        columns={columns}
        embeddable={embeddable}
      >
        {children}
      </TableProvider>
    </div>
  );
};

const getEmbeddable = (children: ReactNode): boolean => {
  const tableBody = Children.toArray(children)
    .filter(isValidElement)
    .find((child) => {
      return child.type === TableBody;
    }) as ReactElement<TableBodyProps> | undefined;

  if (!tableBody) {
    throwError("need body");
  }

  return Children.toArray(tableBody?.props.children).some((child) => {
    const row = child as ReactElement<TableRowProps>;

    return Children.toArray(row.props.children)
      .filter(isValidElement)
      .some((child) => child.type === TableRowEmbed);
  });
};

const getColumns = (children: ReactNode): TableColumnValues[] => {
  const tableHead = Children.toArray(children)
    .filter(isValidElement)
    .find((child) => child.type === TableHead) as
    | ReactElement<TableHeadProps>
    | undefined;

  if (!tableHead) {
    throwError("need a head");
  }

  return Children.toArray(tableHead?.props.children).map((child) => {
    const tableColumn = child as ReactElement<Required<TableColumnProps>>;

    const { sticky, summary, transform, children } = tableColumn.props;

    return {
      sticky,
      summary,
      label: children,
      transform: transform || identity,
    };
  });
};

function identity<TData>(data: TData): TData {
  return data;
}
