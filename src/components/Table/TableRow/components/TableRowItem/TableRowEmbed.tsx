import { FC, ReactNode } from "react";

interface TableRowEmbedProps {
  children: ReactNode;
}

export const TableRowEmbed: FC<TableRowEmbedProps> = ({ children }) => {
  return <div>{children}</div>;
};
