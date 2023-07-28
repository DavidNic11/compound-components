import { ReactNode, FC } from "react";

import { useTable } from "../../TableContext";

import sharedStyles from "../Shared.module.scss";

interface FullWrapperProps {
  children?: ReactNode;
}

export const FullWrapper: FC<FullWrapperProps> = ({ children }) => {
  const { embeddable } = useTable();

  return (
    <div className={sharedStyles.row}>
      {embeddable && <div className={sharedStyles["row-item"]}>chev</div>}
      {children}
    </div>
  );
};
