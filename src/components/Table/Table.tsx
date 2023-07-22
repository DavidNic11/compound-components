import {
  Children,
  FC,
  ReactElement,
  ReactNode,
  cloneElement,
  createContext,
  isValidElement,
  useContext,
  useState,
} from "react";
import { throwError } from "../../shared/utilities";

import sharedStyles from "./Shared.module.scss";
import tableStyles from "./Table.module.scss";
import tableHeadStyles from "./TableHead.module.scss";
import cn from "classnames";

interface TableColumn {
  summary: boolean;
  sticky: boolean;
  label: string;
  transform: (value: any) => ReactNode;
}

interface TableContextValues {
  columns: Array<TableColumn>;
  embeddable: boolean;
  variant: "full" | "compact";
}

function identity<TData>(data: TData): TData {
  return data;
}

const TableContext = createContext<TableContextValues | null>(null);

const useTable = () => {
  return useContext(TableContext) ?? throwError("");
};

interface TableProviderProps extends TableContextValues {
  children: ReactNode;
}

const TableProvider: FC<TableProviderProps> = ({
  children,
  variant,
  columns,
  embeddable,
}) => {
  return (
    <TableContext.Provider value={{ variant, columns, embeddable }}>
      {children}
    </TableContext.Provider>
  );
};

interface TableProps {
  children: ReactNode;
}

export const Table: FC<TableProps> = ({ children }) => {
  const [variant, setVariant] = useState<TableContextValues["variant"]>("full");

  const embeddable = (() => {
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
  })();

  const columns = (() => {
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
  })();

  return (
    <div className={tableStyles.table}>
      <TableProvider {...{ variant, columns, embeddable }}>
        {children}
      </TableProvider>
    </div>
  );
};

interface TableHeadProps {
  children: ReactNode;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface TableColumnProps extends Partial<Omit<TableColumn, "label">> {
  children: string;
}

export const TableHead: FC<TableHeadProps> = ({ children }) => {
  const { embeddable } = useTable();

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

interface TableBodyProps {
  children: ReactNode;
}

export const TableBody: FC<TableBodyProps> = ({ children }) => {
  return <div>{children}</div>;
};

interface TableRowProps {
  variant?: "highlighted" | "default";
  children: ReactNode;
}

export const TableRow: FC<TableRowProps> = ({ children }) => {
  const { columns, embeddable } = useTable();

  const newChildren = Children.toArray(children).map((child, columnIndex) => {
    const rowItem = child as ReactElement<RowItemsProps>;
    const column = columns[columnIndex];

    return cloneElement(rowItem, {
      ...rowItem.props,
      ...column,
    });
  });

  return (
    <>
      <div className={sharedStyles.row}>
        {embeddable && <div className={sharedStyles["row-item"]}>chev</div>}
        {newChildren}
      </div>
    </>
  );
};

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface InternalRowItemsProps extends TableColumn {}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface RowItemsProps extends InternalRowItemsProps {
  children: ReactNode;
}

const _TableRowItem: FC<RowItemsProps> = ({
  children,
  sticky,
  summary,
  transform,
}) => {
  return <div className={sharedStyles["row-item"]}>{transform(children)}</div>;
};

export const TableRowItem = _TableRowItem as FC<
  Omit<RowItemsProps, keyof InternalRowItemsProps>
>;

interface TableRowEmbedProps {
  children: ReactNode;
}

export const TableRowEmbed: FC<TableRowEmbedProps> = ({ children }) => {
  return <div>{children}</div>;
};
