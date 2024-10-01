import clsx from "clsx";
import React from "react";

const Button = ({ icon, className, label, type = "button", onClick = () => {} }) => {
  return (
    <button
      type={type}
      className={clsx("flex items-center justify-center px-4 py-2 rounded transition-colors duration-150", className)}
      onClick={onClick}
      aria-label={label} // Added for better accessibility
    >
      {icon && <span className="mr-2">{icon}</span>} {/* Added margin to separate icon and label */}
      <span>{label}</span>
    </button>
  );
};

export default Button;
