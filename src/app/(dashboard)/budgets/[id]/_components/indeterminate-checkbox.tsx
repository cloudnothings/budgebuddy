/* eslint-disable @typescript-eslint/no-unsafe-return */
"use client";
import * as React from "react";

export function IndeterminateCheckbox({
  indeterminate, className = '', ...rest
}: { indeterminate?: boolean; } & React.HTMLProps<HTMLInputElement>) {
  const ref = React.useRef<HTMLInputElement>(null!);

  React.useEffect(() => {
    if (typeof indeterminate === 'boolean') {
      ref.current.indeterminate = !rest.checked && indeterminate;
    }
  }, [ref, indeterminate]);

  return (
    <input
      onClick={(e) => {
        e.stopPropagation();
      }}
      type="checkbox"
      ref={ref}
      className={className + ' cursor-pointer'}
      {...rest} />
  );
}
