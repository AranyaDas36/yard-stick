import React, { ReactNode } from "react";

interface PopoverProps {
  children: ReactNode;
}

interface PopoverTriggerProps {
  children: ReactNode;
  onClick: () => void;
}

export function Popover({ children }: PopoverProps) {
  return <div className="relative">{children}</div>;
}

export function PopoverTrigger({ children, onClick }: PopoverTriggerProps) {
  return (
    <button onClick={onClick} className="px-3 py-2 border rounded">
      {children}
    </button>
  );
}

export function PopoverContent({ children }: PopoverProps) {
  return (
    <div className="absolute left-0 mt-2 p-2 bg-white border shadow-lg rounded-md">
      {children}
    </div>
  );
}
