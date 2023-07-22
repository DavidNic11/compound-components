import { ReactNode, FC } from "react";
import sharedStyles from "../Shared.module.scss";
import { useTable } from "..";

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
