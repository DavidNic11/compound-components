import type { FC, ReactNode } from "react";

import cn from "classnames";

import { useDropdown } from "../../DropdownContext";

interface DropdownItemProps {
  value: string;
  children?: ReactNode;
}
export const DropdownItem: FC<DropdownItemProps> = ({ value, children }) => {
  const { setSelectedValue, setIsOpen, selectedValue } = useDropdown();
  const { className, getActiveStyles } = useDropdownItemStyles();

  return (
    <button
      className={cn(className, getActiveStyles(selectedValue === value))}
      onClick={() => {
        setSelectedValue(value);
        setIsOpen(false);
      }}
    >
      {children}
    </button>
  );
};

const useDropdownItemStyles = () => {
  return {
    className: "w-full p-2 hover:bg-violet-100",
    getActiveStyles: (isActive: boolean) => {
      if (!isActive) return;

      return "bg-violet-200";
    },
  };
};
