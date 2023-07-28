import { FC, ReactNode, createContext, useContext } from "react";
import { throwError } from "../../shared/utilities";

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

const TableContext = createContext<TableContextValues | null>(null);

export const useTable = () => {
  return useContext(TableContext) ?? throwError("");
};

export interface TableProviderProps extends TableContextValues {
  children: ReactNode;
}

export const TableProvider: FC<TableProviderProps> = ({
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
