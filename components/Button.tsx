import React, { forwardRef } from "react";

interface ButtonProps {
  type?: "button" | "reset" | "submit" | undefined;
  className?: string;
  size?: string;
  color?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  children?: string;
}

const Button = ({
  type,
  className,
  size,
  color,
  onClick,
  children,
}: ButtonProps) => (
  <button
    type={type}
    className={`${className} ${size} ${color}`}
    onClick={onClick}
  >
    {children}
  </button>
);

export default Button;
