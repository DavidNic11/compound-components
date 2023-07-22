import {
  Children,
  FC,
  ReactElement,
  ReactNode,
  createContext,
  isValidElement,
  useContext,
  useState,
} from "react";
import { throwError } from "../../shared/utilities";

import tableStyles from "./Table.module.scss";
import { TableBody, TableBodyProps } from "./TableBody";
import { TableRowEmbed, TableRowProps } from "./TableRow";
import { TableColumnProps, TableHead, TableHeadProps } from "./TableHead";

export interface TableColumnValues {
  summary: boolean;
  sticky: boolean;
  label: string;
  transform: (value: any) => ReactNode;
}

export interface TableContextValues {
  columns: Array<TableColumnValues>;
  embeddable: boolean;
  variant: "full" | "compact";
}

function identity<TData>(data: TData): TData {
  return data;
}

const TableContext = createContext<TableContextValues | null>(null);

export const useTable = () => {
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
  passedVariant?: TableContextValues["variant"];
}

export const Table: FC<TableProps> = ({ children, passedVariant }) => {
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
      <TableProvider
        {...{ variant: passedVariant || variant, columns, embeddable }}
      >
        {children}
      </TableProvider>
    </div>
  );
};
