import { ComponentProps, FC, ReactNode, useState } from "react";
import { DropdownProvider, useDropdown } from "./DropdownContext";
import classNames from "classnames";

import styles from "./Dropdown.module.scss";

const Button: FC<ComponentProps<"button">> = ({
  children,
  className,
  ...rest
}) => {
  return (
    <button className={classNames(styles.button, className)} {...rest}>
      {children}
    </button>
  );
};

interface DropdownProps {
  children?: ReactNode;
  label: string;
}

export const Dropdown: FC<DropdownProps> = ({ children, ...rest }) => {
  const [selectedValue, setSelectedValue] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  return (
    <DropdownProvider
      selectedValue={selectedValue}
      setSelectedValue={setSelectedValue}
      isOpen={isOpen}
      setIsOpen={setIsOpen}
    >
      <InternalDropdown {...rest}>{children}</InternalDropdown>
    </DropdownProvider>
  );
};

const InternalDropdown: FC<DropdownProps> = ({ children, label }) => {
  const { isOpen, setIsOpen, selectedValue } = useDropdown();

  return (
    <div className={classNames(styles["dropdown-container"])}>
      <Button
        className={styles["selected-container"]}
        onClick={() => {
          setIsOpen(!isOpen);
        }}
      >
        {selectedValue || label}
      </Button>
      {isOpen && <div className={styles["dropdown-list"]}>{children}</div>}
    </div>
  );
};

interface DropdownItemProps {
  value: string;
  children?: ReactNode;
}
export const DropdownItem: FC<DropdownItemProps> = ({ value, children }) => {
  const { setSelectedValue, setIsOpen } = useDropdown();

  return (
    <Button
      onClick={() => {
        setSelectedValue(value);
        setIsOpen(false);
      }}
    >
      {children}
    </Button>
  );
};
