import { Children, FC, ReactElement, ReactNode, isValidElement } from "react";
import { throwError } from "../../shared/utilities";

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

interface TableProps {
  children: ReactNode;
  variant?: TableContextValues["variant"];
}

export const Table: FC<TableProps> = ({ children, variant: variantProp }) => {
  const variant = useTableVariant(variantProp);

  const columns = getColumns(children);

  return (
    <div className="w-full">
      <TableProvider variant={variant} columns={columns}>
        {children}
      </TableProvider>
    </div>
  );
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
