import React, { InputHTMLAttributes, useRef, useState } from "react";

type InputFieldPropType = {
  leftElement?: React.ReactNode;
  rightElement?: React.ReactNode;
  validation?: (value: string) => string;
  setter?: (value: string) => void;
};

const InputField = ({
  leftElement = null,
  rightElement = null,
  validation = (value) => value,
  setter,
  className,
  ...props
}: InputFieldPropType & InputHTMLAttributes<HTMLInputElement>) => {
  const [focused, setFocused] = useState(false);
  const inputRef = useRef(null);

  return (
    <div
      className={`border ${
        focused ? "border-white/20" : "border-transparent"
      } bg-white/10 rounded-md flex stroke-white/40 items-center px-3`}
    >
      {leftElement}
      <input
        ref={inputRef}
        placeholder="0.00"
        value={props.value}
        onFocus={(e) => {
          setFocused(true);
          props.onFocus?.(e);
        }}
        onBlur={(e) => {
          setFocused(false);
          props.onBlur?.(e);
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            (e.target as HTMLInputElement).blur();
          }
        }}
        onChange={(e) => {
          const value = validation(e.target.value);
          if (setter) {
            setter(value);
          } else {
            props.onChange?.(e);
          }
        }}
        className={`${className} py-1.5 outline-none w-full bg-transparent placeholder:text-white/40 px-1 text-sm font-medium `}
        {...props}
      />
      {rightElement}
    </div>
  );
};

export default InputField;
