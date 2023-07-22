import { FC, ReactNode } from "react";

export interface TableBodyProps {
  children: ReactNode;
}

export const TableBody: FC<TableBodyProps> = ({ children }) => {
  return <div>{children}</div>;
};
