import React from "react";
export function Input({ value, setValue, type }) {
  return (
    <input
      value={value}
      type={type}
      onChange={(val) => {
        setValue(val.target.value, type);
      }}
    />
  );
}
