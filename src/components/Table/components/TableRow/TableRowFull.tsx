import { ReactNode, FC } from "react";

import { useTable } from "../../TableContext";

interface FullWrapperProps {
  children?: ReactNode;
}

export const FullWrapper: FC<FullWrapperProps> = ({ children }) => {
  const { columns } = useTable();

  return (
    <div className={`py-2 border-b grid grid-cols-${columns.length}`}>
      {children}
    </div>
  );
};
