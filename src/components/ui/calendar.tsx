import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface CalendarProps {
  selected: Date | undefined;
  onSelect: (date: Date | null) => void;
  disabled?: (date: Date) => boolean;
}

export function Calendar({ selected, onSelect, disabled }: CalendarProps) {
  return (
    <DatePicker
      selected={selected}
      onChange={(date) => onSelect(date)}
      filterDate={disabled} // Prevents selecting disabled dates
    />
  );
}
