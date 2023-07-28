import { ReactNode, FC, createContext, useContext } from "react";
import { throwError } from "../../../shared/utilities";

interface DropdownContext {
  selectedValue: string;
  setSelectedValue: (newValue: string) => void;
  isOpen: boolean;
  setIsOpen: (newIsOpen: boolean) => void;
}

const DropdownContext = createContext<DropdownContext | null>(null);

interface DropDownProviderProps extends DropdownContext {
  children?: ReactNode;
}

export const DropdownProvider: FC<DropDownProviderProps> = ({
  children,
  selectedValue,
  setSelectedValue,
  isOpen,
  setIsOpen,
}) => {
  return (
    <DropdownContext.Provider
      value={{ setSelectedValue, selectedValue, isOpen, setIsOpen }}
    >
      {children}
    </DropdownContext.Provider>
  );
};

export const useDropdown = (): DropdownContext => {
  return (
    useContext(DropdownContext) ??
    throwError("Must use useDropDown within its provider")
  );
};
