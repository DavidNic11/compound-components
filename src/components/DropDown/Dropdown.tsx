import { FC, ReactNode, useCallback, useRef } from "react";

import { useState } from "react";

import { DropdownProvider, useDropdown } from "./DropdownContext";
import { useEscapeKey } from "../../shared/hooks/useEscapeKey";
import { useOnClickOutside } from "../../shared/hooks/useClickOutside";

interface DropdownProps {
  children?: ReactNode;
  label: string;
}

export const Dropdown: FC<DropdownProps> = ({ children, ...rest }) => {
  const [selectedValue, setSelectedValue] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  useEscapeKey(useCallback(() => setIsOpen(false), []));

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
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const { isOpen, setIsOpen, selectedValue } = useDropdown();
  const { container, button, list } = useDropdownStyles();

  useOnClickOutside(
    dropdownRef,
    useCallback(() => setIsOpen(false), [])
  );

  return (
    <div ref={dropdownRef} {...container}>
      <button
        {...button}
        onClick={() => {
          setIsOpen(!isOpen);
        }}
      >
        {selectedValue || label}
      </button>
      {isOpen && <div {...list}>{children}</div>}
    </div>
  );
};

const useDropdownStyles = () => {
  return {
    container: {
      className: "p-2 relative text-center border border-violet-800",
    },
    button: {
      className: "w-full",
    },
    list: {
      className:
        "absolute top-full bg-white w-full left-0 z-10 w-100 drop-shadow-lg rounded-sm",
    },
  };
};
